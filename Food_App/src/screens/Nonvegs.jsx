import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNonVegPizzas } from '../actions/PizzaActions';
import NonvegPizzascreen from '../components/NonvegPizzascreen';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Nonvegs() {
  const dispatch = useDispatch();
  const nonvegpizzaState = useSelector((state) => state.getAllNonVegPizzasReducer);
  const { nonvegpizzas, loading, error } = nonvegpizzaState || {};

  useEffect(()=>{
    dispatch(getAllNonVegPizzas())
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
      {loading && (<Loading/>)}
      <div className="row m-2">
        <h2 className='text-center m-3'>Non Veg Pizzas</h2>
        {nonvegpizzas.length > 0 ? (
          nonvegpizzas.map((pizza) => (
            <div className="pizza_section col-md-4 mb-2 text-center" key={pizza._id}>
              <NonvegPizzascreen pizza={pizza} />
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

export default Nonvegs
