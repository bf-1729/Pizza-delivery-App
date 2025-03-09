import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParathaPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Parathapizza from '../components/Parathapizza';
import PizzaNavbar from '../components/PizzaNavbar';
import "./nonvegs.css"

function Parathapizzasscreen() {
  const dispatch = useDispatch();
  const parathapizzaState = useSelector((state) => state.getAllParathaPizzasReducer);
  const { parathapizzas, loading } = parathapizzaState || {};

  useEffect(()=>{
    dispatch(getAllParathaPizzas())
  },[dispatch])
  return (
    <div className='main_pizza'>
      <Navbar/>
      <PizzaNavbar/>
        <h2 className='text-center m-3'>Paratha Pizzas</h2>
        <div className='Parathapizza'>
        {parathapizzas.length > 0 ? (
          parathapizzas.map((pizza) => (
            <div className="pizza_section" key={pizza._id}>
              <Parathapizza pizza={pizza} />
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

export default Parathapizzasscreen
