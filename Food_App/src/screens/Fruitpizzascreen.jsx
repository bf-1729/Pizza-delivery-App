import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFruitPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Fruitpizza from '../components/Fruitpizza';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Fruitpizzascreen() {
  const dispatch = useDispatch();
  const fruitpizzaState = useSelector((state) => state.getAllFruitPizzasReducer);
  const { fruitpizzas, loading } = fruitpizzaState || {};

  useEffect(()=>{
    dispatch(getAllFruitPizzas())
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
      {loading && <Loading/>}
      <div className="row m-2">
        <h2 className='text-center m-3'>Fruit Pizzas</h2>
        {fruitpizzas.length > 0 ? (
          fruitpizzas.map((pizza) => (
            <div className="pizza_section col-md-4 mb-2 text-center" key={pizza._id}>
              <Fruitpizza pizza={pizza} />
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

export default Fruitpizzascreen
