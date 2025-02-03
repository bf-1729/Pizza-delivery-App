import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaneerPizzas } from '../actions/PizzaActions';
import Navbar from '../components/Navbar';
import PizzaNavbar from '../components/PizzaNavbar';
import Paneerpizza from '../components/Paneerpizza';
import "./nonvegs.css"

function Paneerpizzasscreen() {
  const dispatch = useDispatch();
  const paneerpizzaState = useSelector((state) => state.getAllPaneerPizzasReducer);
  const { paneerpizzas = [], loading } = paneerpizzaState;

  // Fetch paneer pizzas on component mount
  useEffect(() => {
    dispatch(getAllPaneerPizzas());
  }, [dispatch]);

  return (
    <div className='main_pizza'>
      <Navbar />
      <PizzaNavbar />
      <div className="row m-2">
        <h2 className="text-center m-3">Paneer Pizzas</h2>

        {/* Loading State */}
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div className="col-md-4 mb-2 text-center" key={index}>
                <Skeleton height={200} />
                <Skeleton height={30} style={{ marginTop: '10px' }} />
                <Skeleton height={20} width={100} style={{ marginTop: '10px' }} />
              </div>
            ))
        ) : paneerpizzas.length > 0 ? (
          // Render Paneer Pizzas
          paneerpizzas.map((pizza) => (
            <div
              className="pizza_section col-md-4 mb-2 text-center"
              key={pizza._id}
            >
              <Paneerpizza pizza={pizza} />
            </div>
          ))
        ) : (
          // No Data State
          <div className="text-center">
            <h4>No paneer pizzas available!</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Paneerpizzasscreen;
