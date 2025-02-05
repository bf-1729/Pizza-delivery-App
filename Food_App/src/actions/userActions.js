import axios from "axios"
import {toast} from "react-toastify"
export const registerUser = (user)=> async dispatch =>{
    dispatch({type:"USER_REGISTER_REQUEST"})
    try{
        const response = await axios.post("http://localhost:4000/api/users/register",user)
        console.log(response)
        dispatch({type:"USER_REGISTER_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"USER_REGISTER_FAILED",payload : error})
    }
}

export const loginUser = (user) => async dispatch=>{
    dispatch({type : "USER_LOGIN_REQUEST"})
    try{
        const response = await axios.post("http://localhost:4000/api/users/login",user)
        dispatch({type : "USER_LOGIN_SUCCESS",payload : response.data})
        localStorage.setItem("currentUser",JSON.stringify(response.data))
        window.location.href = "/"
    }
    catch(error){
        dispatch({type : "USER_LOGIN_FAILED"})
    }
}
export const logoutUser = ()=>dispatch=>{
    localStorage.removeItem("currentUser")
    window.location.href = "/login"
}

export const getAllUsers = ()=>async dispatch=>{
    dispatch({type:"GET_USERS_REQUEST"})
    try{
        const response = await axios.get("http://localhost:4000/api/users/getallusers");
        dispatch({type:"GET_USERS_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_USERS_FAILED",payload:error})
    }
}

export const deleteUser = (userid) => async dispatch=>{
    try{
        await axios.post("http://localhost:4000/api/users/deleteuser",{userid})
        toast.success("User deleted successfully")
    }
    catch(error){
        console.log(error)
        toast.error("User not deleted.Try Again!")
    }
}

