import React, { useEffect, useMemo } from "react";
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
  const { pizzas = [], error, loading } = useSelector(
    (state) => state.getAllPizzasReducer
  );

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  // Memoize filtered pizzas
  const filteredPizzas = useMemo(
    () => pizzas.filter((item) => item.page?.includes("Homescreen")),
    [pizzas]
  );

  return (
    <div className="main_screen">
      <Navbar />
      <HomeNavbar />
      <Carousel />

      {error && <h2 className="error_message">Error: {error}</h2>}

      {!error && !loading && filteredPizzas.length === 0 && (
        <h2 className="no_pizzas_message">No pizzas available</h2>
      )}

      {!error && filteredPizzas.length > 0 && (
        <>
          <h1 className="home_heading">Latest Pizzas</h1>
          <div className="pizzascreen_container">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div className="skeleton_pizza" key={index}></div>
                ))
              : filteredPizzas.slice(0, 8).map((pizza) => (
                  <div className="pizzascreen" key={pizza._id}>
                    <LatestPizza pizza={pizza} />
                  </div>
                ))}
          </div>

          <h1 className="home_heading">Pizzas</h1>
          <div className="pizzascreen_container">
            {loading
              ? Array.from({ length: filteredPizzas.length - 8 }).map(
                  (_, index) => <div className="skeleton_pizza" key={index}></div>
                )
              : filteredPizzas.slice(8).map((pizza) => (
                  <div className="pizzascreen" key={pizza._id}>
                    <Pizza pizza={pizza} />
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Homescreen;
