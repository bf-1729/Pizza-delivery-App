import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editPizza, getPizzaById } from '../actions/PizzaActions';
import Loading from '../components/Loading'
import "./Editpizza.css"

const Editpizza = () => {
    const { pizzaid } = useParams(); // Get the pizzaid from the route parameters
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [smallprice, setSmallprice] = useState()
    const [mediumprice, setMediumprice] = useState()
    const [largeprice, setLargeprice] = useState()
    const [image, setImage] = useState('')
    const [choice,setChoice] = useState('')
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
            },
            choice
        }
        dispatch(editPizza(editedpizza))
    }
    const getpizzabyid = useSelector(state => state.getPizzaByIdReducer)
    const editpizzastate = useSelector(state=>state.editPizzaReducer)
    const { pizza, loading } = getpizzabyid
    const {editloading} = editpizzastate
    

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
            setChoice(pizza.choice)
            }else{
                dispatch(getPizzaById({ pizzaid }))
            }
        }
        else{
            dispatch(getPizzaById({ pizzaid }))
        }
    }, [pizza,dispatch])

    return (
    <div className="editpizza_container">
    <h2 className='editpizza_header'>Edit Pizza</h2>

    <h4 className="pizza_id">Pizza ID: {pizzaid}</h4>

    <div className="editpizza_card">
        {loading && <Loading />}
        {editloading && <Loading />}

        <form onSubmit={formHandler}>
            <div className="form-group">
                <label>Pizza Name</label>
                <input className='form-values' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Small Size Price</label>
                <input className='form-values' type="number" value={smallprice} onChange={(e) => setSmallprice(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Medium Size Price</label>
                <input className='form-values' type="number" value={mediumprice} onChange={(e) => setMediumprice(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Large Size Price</label>
                <input className='form-values' type="number" value={largeprice} onChange={(e) => setLargeprice(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea className='form-values' value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Category</label>
                <input className='form-values' type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            
            <button className="save_button">Save Changes</button>
        </form>
    </div>
</div>
);
};

export default Editpizza;
