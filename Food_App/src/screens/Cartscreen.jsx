import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import "./Cartscreen.css"
import "../App.css"
import img from "../assets/cartEmpty.gif"
import { toast } from 'react-toastify';

const Cartscreen = () => {
  const dispatch = useDispatch();
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = Array.isArray(cartstate.cartItems) ? cartstate.cartItems : [];
  const navigate = useNavigate()

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  console.log(subtotal)
  const handleProceedToCheckout = () => {
    if (cartItems && cartItems.length > 0) {
      const exist = localStorage.getItem("currentUser")
      if(exist){
        navigate("/cart/address");
      }else{
        toast.error("Please login")
      }
    } else {
      toast.error("add items to proceed")
    }
};

  return (
    <div
      id="cartscreen"
      style={{
        backgroundColor: "rgb(249, 212, 212)",
        minHeight: '100vh',
        marginTop:"40px",
        padding: '20px 0',
      }}
    >
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 cart_data">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={item._id || index}
                  className="cart_data d-flex align-items-center justify-content-between bg-white shadow-sm p-3 mb-4 rounded"
                  style={{
                    borderLeft: '5px solid #3498db',
                    transition: 'box-shadow 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)')}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                    />
                    <div className='font'>
                      <h5 className='cartpizza_name'>
                        {item.name} [{item.varient}]
                      </h5>
                      <p className='item_calc' style={{ marginBottom: '8px', color: '#7f8c8d' }}>
                        {item.quantity} x ₹{item.prices[0][item.varient]} = ₹{item.price}
                      </p>
                      <div className='cart_increase'>
                        <i
                          className="fa fa-minus-circle text-danger mr-2"
                          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                          onClick={() => {
                            if (item.quantity > 1) dispatch(addToCart(item, item.quantity - 1, item.varient,subtotal));
                          }}
                        ></i>
                        <span className='cart_number'>
                          {item.quantity}
                        </span>
                        <i
                          className="fa fa-plus-circle text-success ml-2"
                          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                          onClick={() => dispatch(addToCart(item, item.quantity + 1, item.varient))}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <i
                    className="fa fa-trash text-danger delete_button"
                    onClick={() => dispatch(deleteFromCart(item))}
                  ></i>
                </div>
              ))
            ) : (
              <div className="text-center mt-5">
                <img
                  src={img}
                  alt="Empty Cart"
                  className="img-fluid mb-4"
                  style={{ width: '140px' }}
                />
                <h4 style={{ color: '#7f8c8d' }}>Your cart is empty!</h4>
                <p style={{ color: '#95a5a6' }}>Looks like you haven't added any items yet.</p>
              </div>
            )}
          </div>
        </div>
        <div className="text-center cart_header fixed-bottom">
          <h2 className='subtotal'>Sub Total : ₹{subtotal}/-</h2>
          <button
          className='cart_button btn btn-primary'
          onClick={handleProceedToCheckout}>Place order</button>
        </div>
      </div>
      
    </div>
  );
};

export default Cartscreen;
