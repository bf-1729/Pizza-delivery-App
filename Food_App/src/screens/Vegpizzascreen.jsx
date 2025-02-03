import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVegPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Vegpizza from '../components/Vegpizza';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Vegpizzascreen() {
  const dispatch = useDispatch();
  const vegpizzaState = useSelector((state) => state.getAllVegPizzasReducer);
  const { vegpizzas, loading } = vegpizzaState || {};

  useEffect(()=>{
    dispatch(getAllVegPizzas())
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
      {loading && <Loading/>}
      <div className="row m-2">
        <h2 className='text-center m-3'>Veg Pizzas</h2>
        {vegpizzas.length > 0 ? (
          vegpizzas.map((pizza) => (
            <div className="pizza_section col-md-4 mb-2 text-center" key={pizza._id}>
              <Vegpizza pizza={pizza} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No pizzas match your search!</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default Vegpizzascreen
