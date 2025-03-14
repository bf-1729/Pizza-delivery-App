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

  if (loading) {
    return <h4 className="text-center mt-5">Loading pizzas...</h4>;
  }

  if (error) {
    return <h4 className="text-center mt-5">Error loading pizzas. Please try again later.</h4>;
  }

  // Filter pizzas for Homescreen
  const filteredPizzas = pizzas.filter(
    (item) => item.page?.includes("Homescreen")
  );

  console.log(pizzas);
  

  return (
    <div className="main_screen">
      <Navbar />
      <HomeNavbar />
      <Carousel />

      <h1 className="home_heading">Latest Pizzas</h1>
      <div className="pizzascreen_container">
        {filteredPizzas.length ? (
          [...filteredPizzas].reverse().slice(0, 8).map((pizza) => (
            <div className="pizzascreen" key={pizza._id}>
              <LatestPizza pizza={pizza} />
            </div>
          ))
        ) : (
          <p>No pizzas available.</p>
        )}
      </div>

      <h1 className="home_heading">Pizzas</h1>
      <div className="pizzascreen_container">
        {filteredPizzas.length ? (
          [...filteredPizzas].reverse().slice(8).map((pizza) => (
            <div className="pizzascreen" key={pizza._id}>
              <Pizza pizza={pizza} />
            </div>
          ))
        ) : (
          <p>No pizzas available.</p>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
