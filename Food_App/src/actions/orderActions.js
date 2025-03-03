import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AddressUser = (address) => async (dispatch) => {
  dispatch({ type: "USER_ADDRESS_REQUEST" });
  try {
    const response = await axios.post(`${backendUrl}/api/orders/address`, address);
    dispatch({ type: "USER_ADDRESS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "USER_ADDRESS_FAILED",
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to place order");
  }
};

// Action to fetch all user orders
export const UserAddress = () => async (dispatch) => {
  dispatch({ type: "GET_USER_ADDRESS_REQUEST" });
  try {
    const response = await axios.get(`${backendUrl}/api/orders/getorders`);
    dispatch({ type: "GET_USER_ADDRESS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "GET_USER_ADDRESS_FAILED",
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to fetch orders");
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: "DELIVER_ORDER_REQUEST" });

    const { data } = await axios.put(`${backendUrl}/api/orders/deliverOrder/${orderId}`);

    dispatch({ type: "DELIVER_ORDER_SUCCESS", payload: data });

    dispatch(UserAddress());

    window.location.href = "/admin/orderslist";

  } catch (error) {
    dispatch({
      type: "DELIVER_ORDER_FAIL",
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to update order status");
  }
};
