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
  const { pizzas = [], error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  // Filter pizzas for Homescreen
  const filteredPizzas = Array.isArray(pizzas)
  ? pizzas.filter((item) => item.page?.includes("Homescreen"))
  : [];


  return (
    <div className="main_screen">
      <Navbar />
      <HomeNavbar />
      <Carousel />

      <h1 className="home_heading">Latest Pizzas</h1>
      <div className="pizzascreen_container">
        {filteredPizzas.reverse().slice(0,4).map((pizza) => (
              <div className="pizzascreen" key={pizza._id}>
                <LatestPizza pizza={pizza} />
              </div>
            ))}
      </div>

      <h1 className="home_heading">Pizzas</h1>
      <div className="pizzascreen_container">
        {filteredPizzas.slice(4).map((pizza) => (
              <div className="pizzascreen" key={pizza._id}>
                <Pizza pizza={pizza} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Homescreen;
