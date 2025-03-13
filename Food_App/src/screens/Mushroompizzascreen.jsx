import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMushroomPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import Mushroompizza from "../components/Mushroompizza"
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Mushroompizzascreen() {
  const dispatch = useDispatch();
  const mushroompizzaState = useSelector((state) => state.getAllMushroomPizzasReducer);
  const { mushroompizzas } = mushroompizzaState || {};

  useEffect(()=>{
    dispatch(getAllMushroomPizzas());
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
        <h2 className='text-center m-3'>Mushroom Pizzas</h2>
        <div className='pizza_container'>
        {mushroompizzas.length > 0 ? (
          mushroompizzas.map((pizza) => (
            <div className="pizza_section" key={pizza._id}>
              <Mushroompizza pizza={pizza} />
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

export default Mushroompizzascreen
