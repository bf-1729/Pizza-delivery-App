import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/PizzaActions';
import Pizza from '../components/Pizza';
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

      {/* Loading State */}
      {loading && <Loading />}

      {/* Error Handling */}
      {error && <div className="error-message text-center mt-3"><h4>Error: {error}</h4></div>}

      {/* Display Latest Pizza (Only if there are pizzas) */}
      {pizzas.length > 0 && (
        <div className="pizzascreen_container">
          <div className="pizzascreen">
            <LatestPizza pizza={pizzas[0]} />
          </div>
        </div>
      )}

      <h1 className='home_heading'>Pizzas</h1>
      
      {/* Display Pizzas List */}
      <div className="pizzascreen_container">
        {pizzas.length > 1 ? (
          pizzas.slice(1).map((pizza) => ( // Exclude the latest pizza from the list
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
