import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Fixed typo

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const response = await axios.post(`${backendUrl}/api/users/register`, user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    toast.success("Registration successful! Please log in.");
    window.location.href = "/"
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAILED",
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Registration failed!");
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post(`${backendUrl}/api/users/login`, user);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    toast.success("Login successful!");
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Invalid credentials. Try again!");
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  toast.success("Logged out successfully!");
  window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const response = await axios.get(`${backendUrl}/api/users/getallusers`);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "GET_USERS_FAILED",
      payload: error.response?.data?.message || error.message,
    });
    toast.error("Failed to fetch users.");
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post(`${backendUrl}/api/users/deleteuser`, { userid });
    dispatch(getAllUsers()); // Refresh users list after deletion
  } catch (error) {
    console.log(error);
    
  }
};
