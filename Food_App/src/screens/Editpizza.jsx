import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editPizza, getPizzaById } from '../actions/PizzaActions';
import Loading from '../components/Loading'
import Error from '../components/Error'
import Success from "../components/Success"
import "./Editpizza.css"

const Editpizza = () => {
    const { pizzaid } = useParams(); // Get the pizzaid from the route parameters
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [smallprice, setSmallprice] = useState()
    const [mediumprice, setMediumprice] = useState()
    const [largeprice, setLargeprice] = useState()
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    function formHandler(e) {
        e.preventDefault();
        const editedpizza = {
            _id:pizzaid,
            name,
            image,
            description,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice
            }
        }
        dispatch(editPizza(editedpizza))
    }
    const getpizzabyid = useSelector(state => state.getPizzaByIdReducer)
    const getvegpizzaid = useSelector(state=>state.getVegPizzaByIdReducer)
    const editpizzastate = useSelector(state=>state.editPizzaReducer)
    const { pizza, error, loading } = getpizzabyid
    const {vegpizza} = getvegpizzaid
    const {editloading,editerror,editsuccess} = editpizzastate
    console.log(vegpizza)

    useEffect(() => {
        if(pizza){
            console.log(pizza)
            if(pizza._id==pizzaid){
            setName(pizza.name)
            setDescription(pizza.description)
            setCategory(pizza.category)
            setSmallprice(pizza.prices[0]['small'])
            setMediumprice(pizza.prices[0]['medium'])
            setLargeprice(pizza.prices[0]['large'])
            setImage(pizza.image)
            }else{
                dispatch(getPizzaById({ pizzaid }))
            }
        }
        else{
            dispatch(getPizzaById({ pizzaid }))
        }
    }, [pizza,dispatch])

    return (
        <div className='editpizza_main'>
            <div className='section_headers'>
            <h1 className='editpizza_header'>
                <h2 className='edit_header'>Edit Pizza</h2>
                <Link className='cancel_link' to={"/admin/pizzaslist"}>cancel</Link>
                </h1>
            <h1 className='editpizza_ID'>Pizza Id = {pizzaid}</h1>
            </div>

            <div className='text-left'>

                {loading && (<Loading />)}
                {error && (<Error error="fail to load" />)}
                {editsuccess && (<Success success = "pizza edited successfully"/>)}
                {editloading && (<Loading/>)}
                <form className='pizza_form' onSubmit={formHandler}>
                    <input className='form-control m-1' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                    <input className='form-control m-1' type='number' placeholder='Small varient price' value={smallprice} onChange={(e) => setSmallprice(e.target.value)}></input>
                    <input className='form-control m-1' type='number' placeholder='Medium varient price' value={mediumprice} onChange={(e) => setMediumprice(e.target.value)}></input>
                    <input className='form-control m-1' type='number' placeholder='Large varient price' value={largeprice} onChange={(e) => setLargeprice(e.target.value)}></input>
                    <input className='form-control m-1' type='text' placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)}></input>
                    <input className='form-control m-1' type='text' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    <input className='form-control m-1' type='text' placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)}></input>
                    <button className='edit_button m-1 w-100'>Edit Pizza</button>
                </form>
            </div>
        </div>
    );
}

export default Editpizza;
