import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMushroomPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Mushroompizza from '../components/Mushroompizza';
import PizzaNavbar from '../components/PizzaNavbar';

function Mushroompizzascreen() {
  const dispatch = useDispatch();
  const mushroompizzaState = useSelector((state) => state.getAllMushroomPizzasReducer);
  const { mushroompizzas, loading } = mushroompizzaState || {};

  useEffect(()=>{
    dispatch(getAllMushroomPizzas())
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
      {loading && <Loading/>}
      <div className="row m-2">
        <h2 className='text-center m-3'>Mushroom Pizzas</h2>
        {mushroompizzas.length > 0 ? (
          mushroompizzas.map((pizza) => (
            <div className="pizza_section col-md-4 mb-2 text-center" key={pizza._id}>
              <Mushroompizza pizza={pizza} />
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

export default Mushroompizzascreen
