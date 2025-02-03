import axios from "axios"
export const getUserOrders = ()=>async (dispatch,getState)=>{
    const currentUser = getState().loginUserReducer.currentUser
    dispatch({type:"GET_USER_ORDER_REQUEST"})
    try{
        const response = await axios.get("http://localhost:4000/api/orders/getuserorders",{userid : currentUser._id});
        
        console.log("API response:", response.data);
        dispatch({type:"GET_USER_ORDER_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_USER_ORDER_FAILED",payload:error})
    }
}