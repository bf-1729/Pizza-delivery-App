import React, { useState, useEffect } from 'react';
import Pizza from '../components/Pizza';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/PizzaActions';
import Carousel from '../components/Carousel';
import Loading from '../components/Loading';
import HomeNavbar from '../components/HomeNavbar';
import Navbar from '../components/Navbar';
import LatestPizza from '../components/LatestPizza';

function Homescreen() {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasState;

  const [searchTerm, setSearchTerm] = useState(''); // Hold the search term
  const [filteredPizzas, setFilteredPizzas] = useState(pizzas); // Hold the filtered pizzas
  console.log(pizzas)

  // Fetch pizzas initially
  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  // Update filtered pizzas when pizzas are loaded
  useEffect(() => {
    setFilteredPizzas(pizzas);
  }, [pizzas]);

  // Handle filter button click
  const handleFilter = (e) => {
    e.preventDefault(); // Prevent form submission behavior
    const filtered = pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPizzas(filtered);
  };

  return (
    <div className="main_screen">
      <Navbar/>
      <HomeNavbar/>
      <Carousel/>
      {/* <div className="container p-4 mt-4" style={{backgroundColor:"orangered"}}>
        <div className='form col-md-5'>
          <form onSubmit={handleFilter}>
            <input
              type="text"
              placeholder="Search Pizzas"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </form>
          </div>
          <div className='button'>
          <button
              type="submit"
              className="btn btn-primary"
              onClick={handleFilter} // Trigger filtering
            >
              Filter Pizzas
            </button>
            </div>
      </div> */}

      {/* Loading and Error States */}
      {loading && (<Loading/>)}
      {error && <div className="text-center mt-5 text-danger">Error: {error}</div>}

      {/* Pizza List */}
      <div className="home_container row m-1">
        <h1 className='home_heading'>Latest Pizzas</h1>
        {pizzas.length > 0 ? (
          pizzas.slice(0,8).map((pizza) => (
            <div className="pizzascreen col-md-3 text-center" key={pizza._id}>
              <LatestPizza pizza={pizza} />
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No pizzas match your search!</h4>
          </div>
        )}
      </div>
      <div className="home_container row m-1">
        <h1 className='home_heading'>Pizzas</h1>
        {pizzas.length > 0 ? (
          pizzas.slice(8).map((pizza) => (
            <div className="pizzascreen col-md-3 text-center" key={pizza._id}>
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
