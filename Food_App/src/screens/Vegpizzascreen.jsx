import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/PizzaActions';
import Vegpizza from '../components/NonvegPizzascreen';
import Navbar from '../components/Navbar';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Vegpizzascreen() {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, loading, error } = pizzaState || {};

  useEffect(()=>{
    dispatch(getAllPizzas())
  },[dispatch])

  const filteredPizzas = pizzas.filter((item) => item.page?.includes("Veg"));

  if (loading) {
    return <h4 className="text-center mt-5">Loading pizzas...</h4>;
  }

  if (error) {
    return <h4 className="text-center mt-5">Error loading pizzas. Please try again later.</h4>;
  }
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
      <h2 className='text-center m-3'>Veg Pizzas</h2>
      <div className="pizza_container">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <div className="pizza_section" key={pizza._id}>
              <Vegpizza pizza={pizza} />
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

export default Vegpizzascreen
