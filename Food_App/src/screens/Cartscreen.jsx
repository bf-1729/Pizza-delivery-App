import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import "./Cartscreen.css";
import "../App.css";
import { toast } from 'react-toastify';

const Cartscreen = () => {
  const dispatch = useDispatch();
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = Array.isArray(cartstate.cartItems) ? cartstate.cartItems : [];
  const navigate = useNavigate();

  // ✅ Correct subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.prices[0][item.varient], 0);

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      const exist = localStorage.getItem("currentUser");
      if (exist) {
        navigate("/cart/address");
      } else {
        toast.error("Please login to proceed");
      }
    } else {
      toast.error("Add items to proceed");
    }
  };

  return (
    <div className="cartscreen">
      <Navbar />
      <div className="cart_containers">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div 
              key={item._id || index} 
              className="cart_data"
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)')}
            >
              <img src={item.image} alt={item.name} className="cart_image" />
              <div className='cart_calc'>
                <h5 className='cartpizza_name'>
                  {item.name} [{item.varient}]
                </h5>
                <p className='item_calc'>
                  {item.quantity} x ₹{item.prices[0][item.varient]} = ₹{item.quantity * item.prices[0][item.varient]}
                </p>
                <div className='cart_increase'>
                  <i
                    className="fa fa-minus-circle text-danger"
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(addToCart(item, item.quantity - 1, item.varient));
                      }
                    }}
                  ></i>
                  <span className='cart_number'>{item.quantity}</span>
                  <i
                    className="fa fa-plus-circle text-success"
                    onClick={() => dispatch(addToCart(item, item.quantity + 1, item.varient))}
                  ></i>
                </div>
              </div>
              <div>
                <i
                  className="fa fa-trash text-danger delete_button"
                  style={{ cursor: 'pointer', transition: '0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'red')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
                  onClick={() => dispatch(deleteFromCart(item))}
                ></i>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>Your cart is empty!</h4>
            <p>Browse our menu and add items to your cart.</p>
          </div>
        )}
      </div>

      <div className='cart_footer_main'>
      <div className="cart_footer">
        <h2 className='subtotal'>₹{subtotal}/-</h2>
        <button
          className='cart_button btn btn-primary'
          onClick={handleProceedToCheckout}
          disabled={cartItems.length === 0}
        >
          {cartItems.length > 0 ? "Place Order" : "Cart is Empty"}
        </button>
      </div>
      </div>
    </div>
  );
};

export default Cartscreen;
