import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/PizzaActions";
import Pizza from "../components/Pizza";
import Carousel from "../components/Carousel";
import HomeNavbar from "../components/HomeNavbar";
import Navbar from "../components/Navbar";
import LatestPizza from "../components/LatestPizza";
import "./Homescreen.css";

function Homescreen() {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas = [], error } = pizzasState; // Default to an empty array to prevent errors

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);
  if (error) {
    return (
      <div className="text-center mt-5">
        <h4>Error loading pizzas. Please try again later.</h4>
      </div>
    );
  }
  return (
    <div className="main_screen">
      <Navbar />
      <HomeNavbar />
      <Carousel />

      <h1 className="home_heading">Latest Pizzas</h1>

      <div className="pizzascreen_container">
        {pizzas.length > 0 && (
          pizzas.reverse().slice(0,8).map((pizza) => (
            <div className="pizzascreen" key={pizza._id}>
              <LatestPizza pizza={pizza} />
            </div>
          ))
        )}
      </div>

      <h1 className="home_heading">Pizzas</h1>
      
      <div className="pizzascreen_container">
        {pizzas.length > 0 && (
          pizzas.reverse().slice(8).map((pizza) => (
            <div className="pizzascreen" key={pizza._id}>
              <Pizza pizza={pizza} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
