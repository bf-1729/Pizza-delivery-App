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

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPizzas, setFilteredPizzas] = useState([]);

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPizzas(pizzas);
  }, [pizzas]);

  const handleFilter = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredPizzas(pizzas);
      return;
    }
    const filtered = pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPizzas(filtered);
  };

  return (
    <div className="main_screen">
      <Navbar />
      <HomeNavbar />
      <Carousel />

      <div className="container p-4 mt-4" style={{ backgroundColor: "orangered" }}>
        <div className='form col-md-5'>
          <input
            type="text"
            placeholder="Search Pizzas"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='button'>
          <button className="btn btn-primary" onClick={handleFilter}>
            Filter Pizzas
          </button>
        </div>
      </div>

      {loading && <Loading />}
      {error && <div className="text-center mt-5 text-danger">Error: {error}</div>}

      <div className="pizzascreen_container">
        {filteredPizzas.map((pizza) => (
          <div className="pizzascreen" key={pizza._id}>
            <LatestPizza pizza={pizza} />
          </div>
        ))}
      </div>

      <h1 className='home_heading'>Pizzas</h1>
      <div className="pizzascreen_container">

        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
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
