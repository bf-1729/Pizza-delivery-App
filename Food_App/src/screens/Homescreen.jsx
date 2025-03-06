import React, { useState, useEffect } from 'react';
import Pizza from '../components/Pizza';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/PizzaActions';
import Carousel from '../components/Carousel';
import Loading from '../components/Loading';
import HomeNavbar from '../components/HomeNavbar';
import Navbar from '../components/Navbar';
import LatestPizza from '../components/LatestPizza';
import "./Homescreen.css";

function Homescreen() {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div className="main_screen">
      <Navbar />
      <HomeNavbar />
      <Carousel />

      <div className="pizzascreen_container">
        {pizzas.map((pizza) => (
          <div className="pizzascreen" key={pizza._id}>
            <LatestPizza pizza={pizza} />
          </div>
        ))}
      </div>

      <h1 className='home_heading'>Pizzas</h1>
      <div className="pizzascreen_container">

        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <div className="pizzascreen" key={pizza._id}>
              <Pizza pizza={pizza} />
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No pizzas match your search!</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
