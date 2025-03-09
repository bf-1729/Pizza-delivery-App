import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaneerPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import Paneerpizza from '../components/Vegpizza';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Paneerpizzascreen() {
  const dispatch = useDispatch();
  const paneerpizzaState = useSelector((state) => state.getAllPaneerPizzasReducer);
  const { paneerpizzas } = paneerpizzaState || {};

  useEffect(()=>{
    dispatch(getAllPaneerPizzas());
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
        <h2 className='text-center m-3'>Veg Pizzas</h2>
        <div className='pizza_container'>
        {paneerpizzas.length > 0 ? (
          paneerpizzas.map((pizza) => (
            <div className="pizza_section" key={pizza._id}>
              <Paneerpizza pizza={pizza} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No pizzas match your search!</h4>
          </div>
        )}</div>
    </div>
  )
}

export default Paneerpizzascreen
