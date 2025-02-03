import axios from "axios";
import { toast } from "react-toastify";

// Action to submit user address and order
export const AddressUser = (address) => async (dispatch) => {
  dispatch({ type: "USER_ADDRESS_REQUEST" });
  try {
    const response = await axios.post("http://localhost:4000/api/orders/address", address);
    dispatch({ type: "USER_ADDRESS_SUCCESS", payload: response.data });
    toast.success("Order Placed Successfully")
  } catch (error) {
    dispatch({
      type: "USER_ADDRESS_FAILED",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to fetch all user orders
export const UserAddress = () => async (dispatch) => {
  dispatch({ type: "GET_USER_ADDRESS_REQUEST" });
  try {
    const response = await axios.get("http://localhost:4000/api/orders/getorders");
    console.log("Fetched orders:", response.data);
    
    dispatch({ type: "GET_USER_ADDRESS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "GET_USER_ADDRESS_FAILED",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to mark an order as delivered
export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: "DELIVER_ORDER_REQUEST" });

    const { data } = await axios.put(`http://localhost:4000/api/orders/deliverOrder/${orderId}`);
    
    dispatch({ type: "DELIVER_ORDER_SUCCESS", payload: data });
    alert("Ordered")
    window.href = "/admin/orderslist"
    dispatch(UserAddress());
  } catch (error) {
    dispatch({
      type: "DELIVER_ORDER_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};
