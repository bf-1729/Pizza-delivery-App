import React, { useState } from 'react'
import Loading from '../components/Loading'
import Error from '../components/Error'
import "./Addpizza.css"
import Success from "../components/Success"
import { addPizza } from '../actions/PizzaActions'
import { useDispatch,useSelector } from 'react-redux'
function Addpizza() {
    const [name,setName] = useState('')
    const [smallprice,setSmallprice] = useState()
    const [mediumprice,setMediumprice] = useState()
    const [largeprice,setLargeprice] = useState()
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [choice,setChoice] = useState('')

    const pizzaType = ["Homescreen","Nonveg","Veg","Fruit","Paratha","Paneer","Mushroom"]
    const dispatch = useDispatch()
    const addpizzasstate = useSelector(state=>state.addPizzaReducer)
    const {success,error,loading} = addpizzasstate
    function formHandler(e){
        e.preventDefault();
        const pizza = {
            name,
            image,
            description,
            choice,
            category,
            prices : {
                small : smallprice,
                medium : mediumprice,
                large : largeprice
            }
        }
        dispatch(addPizza(pizza))  
    }
  return (  
    <div>
        <div className='addpizza text-left'>
        {loading && (<Loading/>)}
        {error && (<Error error = "fail to load"/>)}
        {success && (<Success success = "New Pizza Added successfully"/>)}
        <h2 className='addpizza_header'>Add Pizza</h2>
        <form onSubmit={formHandler}>
        <select
        className='form-control w-100 m-1'
        style={{cursor:"pointer"}}
            value={choice}
            onChange={(e)=>setChoice(e.target.value)}
            >
                <option value="">Select a Pizza Screen</option>
                {
                    pizzaType.map(choice=>
                        <option value={choice} key={choice}>{choice}</option>
                    )
                }
            </select>
            <input className='form-control m-1' type='text' placeholder='Name of the Pizza' value={name} onChange={(e)=>setName(e.target.value)}></input>
            <input className='form-control m-1' type='number' placeholder='Small varient price' value={smallprice} onChange={(e)=>setSmallprice(e.target.value)}></input>
            <input className='form-control m-1' type='number' placeholder='Medium varient price' value={mediumprice} onChange={(e)=>setMediumprice(e.target.value)}></input>
            <input className='form-control m-1' type='number' placeholder='Large varient price' value={largeprice} onChange={(e)=>setLargeprice(e.target.value)}></input>
            <input className='form-control m-1' type='text' placeholder='Image URL' value={image} onChange={(e)=>setImage(e.target.value)}></input>
            <input className='form-control m-1' type='text' placeholder='pizza description' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            <input className='form-control mb-4 m-1' type='text' placeholder='category' value={category} onChange={(e)=>setCategory(e.target.value)}></input>
            
            <button className='btn btn-primary w-100 addpizza_btn'>Add New Pizza</button>
        </form>
        </div>
    </div>
  )
}

export default Addpizza
