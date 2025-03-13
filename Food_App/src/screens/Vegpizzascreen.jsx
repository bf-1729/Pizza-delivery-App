import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVegPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import Vegpizza from '../components/Vegpizza';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Vegpizzascreen() {
  const dispatch = useDispatch();
  const vegpizzaState = useSelector((state) => state.getAllVegPizzasReducer);
  const { vegpizzas } = vegpizzaState || {};

  useEffect(()=>{
    dispatch(getAllVegPizzas());
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
        <h2 className='text-center m-3'>Veg Pizzas</h2>
        <div className='pizza_container'>
        {vegpizzas.length > 0 ? (
          vegpizzas.map((pizza) => (
            <div className="pizza_section" key={pizza._id}>
              <Vegpizza pizza={pizza} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No pizzas Found</h4>
          </div>
        )}</div>
    </div>
  )
}

export default Vegpizzascreen
