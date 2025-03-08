import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/PizzaActions";
import Pizza from "../components/Pizza";
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import HomeNavbar from "../components/HomeNavbar";
import Navbar from "../components/Navbar";
import LatestPizza from "../components/LatestPizza";
import "./Homescreen.css";

function Homescreen() {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas = [], error, loading } = pizzasState; // Default to an empty array to prevent errors

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h4>Error loading pizzas. Please try again later.</h4>
      </div>
    );
  }

  const latestPizzas = pizzas.slice(0, 8);
  const otherPizzas = pizzas.slice(8);

  return (
    <div className="main_screen">
      <Navbar />
      <HomeNavbar />
      <Carousel />

      <h1 className="home_heading">Latest Pizzas</h1>

      <div className="pizzascreen_container">
        {latestPizzas.length > 0 ? (
          latestPizzas.map((pizza) => (
            <div className="pizzascreen" key={pizza._id}>
              <LatestPizza pizza={pizza} />
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No pizzas match your search!</h4>
          </div>
        )}
      </div>

      <h1 className="home_heading">Pizzas</h1>

      {/* Regular Pizzas */}
      <div className="pizzascreen_container">
        {otherPizzas.length > 0 ? (
          otherPizzas.map((pizza) => (
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
