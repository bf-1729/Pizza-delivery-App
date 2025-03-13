import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFruitPizzas } from '../actions/PizzaActions';
import FruitPizzascreen from '../components/NonvegPizzascreen';
import Navbar from '../components/Navbar';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Fruitpizzascreen() {
  const dispatch = useDispatch();
  const fruitpizzaState = useSelector((state) => state.getAllFruitPizzasReducer);
  const { fruitpizzas } = fruitpizzaState || {};

  useEffect(()=>{
    dispatch(getAllFruitPizzas())
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
      <h2 className='text-center m-3'>Fruit Pizzas</h2>
      <div className="pizza_container">
        {fruitpizzas.length > 0 ? (
          fruitpizzas.map((pizza) => (
            <div className="pizza_section" key={pizza._id}>
              <FruitPizzascreen pizza={pizza} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No pizzas Found</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default Fruitpizzascreen
