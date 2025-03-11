import axios from "axios"
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL
export const getAllPizzas = () => async (dispatch) => {
    dispatch({ type: "GET_PIZZAS_REQUEST" });
    try {
        const response = await axios.get(`${backendUrl}/api/pizzas/getallpizzas`);
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
    } catch (error) {
        console.error("Error fetching pizzas:", error.response ? error.response.data : error.message);
        dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
    }
};


export const getAllNonVegPizzas = ()=>async dispatch=>{
    dispatch({type:"GET_NONVEG_PIZZAS_REQUEST"})
    try{
        const response = await axios.get(backendUrl+"/api/pizzas/getallnonvegpizzas");
        console.log("API response:", response.data);
        dispatch({type:"GET_NONVEG_PIZZAS_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_NONVEG_PIZZAS",payload:error})
    }
}

export const getAllVegPizzas = ()=>async dispatch=>{
    dispatch({type:"GET_VEG_PIZZAS_REQUEST"})
    try{
        const response = await axios.get(backendUrl+"/api/pizzas/getallvegpizzas");
        console.log("API response:", response.data);
        dispatch({type:"GET_VEG_PIZZAS_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_VEG_PIZZAS",payload:error})
    }
}

export const getAllFruitPizzas = ()=>async dispatch=>{
    dispatch({type:"GET_FRUIT_PIZZAS_REQUEST"})
    try{
        const response = await axios.get(backendUrl+"/api/pizzas/getallfruitpizzas");
        console.log("API response:", response.data);
        dispatch({type:"GET_FRUIT_PIZZAS_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_FRUIT_PIZZAS",payload:error})
    }
}

export const getAllParathaPizzas = ()=>async dispatch=>{
    dispatch({type:"GET_PARATHA_PIZZAS_REQUEST"})
    try{
        const response = await axios.get(backendUrl+"/api/pizzas/getallparathapizzas");
        console.log("API response:", response.data);
        dispatch({type:"GET_PARATHA_PIZZAS_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_PARATHA_PIZZAS",payload:error})
    }
}

export const getAllPaneerPizzas = ()=>async dispatch=>{
    dispatch({type:"GET_PANEER_PIZZAS_REQUEST"})
    try{
        const response = await axios.get(backendUrl+"/api/pizzas/getallpaneerpizzas");
        console.log("API response:", response.data);
        dispatch({type:"GET_PANEER_PIZZAS_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_PANEER_PIZZAS_FAILED",payload:error})
    }
}

export const getAllMushroomPizzas = ()=>async dispatch=>{
    dispatch({type:"GET_MUSHROOM_PIZZAS_REQUEST"})
    try{
        const response = await axios.get(backendUrl+"/api/pizzas/getallmushroompizzas");
        console.log("API response:", response.data);
        dispatch({type:"GET_MUSHROOM_PIZZAS_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_MUSHROOM_PIZZAS",payload:error})
    }
}

export const getPizzaById = (pizzaid)=> async dispatch=>{
    console.log(pizzaid)
    dispatch({type:"GET_PIZZABYID_REQUEST"})
    try{
        const response = await axios.post(backendUrl+"/api/pizzas/getpizzabyid",pizzaid);
        
        
        dispatch({type:"GET_PIZZABYID_SUCCESS",payload : response.data})
    }catch(error){
        dispatch({type:"GET_PIZZABYID_FAILED",payload:error})
    }
}

export const addPizza = (pizza)=>  async dispatch =>{
    dispatch({type:"ADD_PIZZA_REQUEST"})
    try{
        const response = await axios.post(backendUrl+"/api/pizzas/addpizza",{pizza})
        dispatch({type:"ADD_PIZZA_SUCCESS",payload : response.data})
        toast.success("Pizza Added Successfully")
    }
    catch(error){
        dispatch({type:"ADD_PIZZA_FAILED",payload:error})
        toast.error("Pizza Adding Failed. Try Again")
    }
}

export const editPizza = (editedpizza)=>  async dispatch =>{
    dispatch({type:"EDIT_PIZZA_REQUEST"})
    try{
        const response = await axios.post(backendUrl+"/api/pizzas/editpizza",{editedpizza})
        console.log(response)
        dispatch({type:"EDIT_PIZZA_SUCCESS",payload : response.data})
    }
    catch(error){
        dispatch({type:"EDIT_PIZZA_FAILED",payload:error})
    }
}

export const deletePizza = (pizzaid)=> async dispatch =>{
    try{
        axios.post(backendUrl+"/api/pizzas/deletepizza",{pizzaid})
        toast.success("Pizza deleted successfully")
    }catch(error){
        toast.error("Something went wrong! Try Again")
    }
}
