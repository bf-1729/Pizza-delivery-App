import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserAddress } from '../actions/orderActions';
import Navbar from '../components/Navbar';
import './Myorders.css';

function MyOrders() {
  const dispatch = useDispatch();

  // Redux state selectors
  const addressState = useSelector((state) => state.UserAddressReducer || {});
  const { Useraddress = [], loading, error } = addressState;

  const userState = useSelector((state) => state.loginUserReducer || {});
  const { currentUser } = userState;
  console.log(currentUser);
  

  // Local states
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Fetch user orders on component mount
  useEffect(() => {
    dispatch(UserAddress());
  }, [dispatch]);

  // Update filtered orders whenever Useraddress changes
  useEffect(() => {
    setFilteredOrders([...Useraddress].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, [Useraddress]);

  // Filter "Incomplete" orders
  const handleFilterIncomplete = () => {
    setIsFiltering(true); // Show loading symbol
    setTimeout(() => {
      const incompleteOrders = Useraddress.filter((order) => order.isDelivered === false);
      setFilteredOrders(incompleteOrders);
      setIsFiltering(false); // Hide loading symbol
    }, 1000); // Simulate a delay for demonstration purposes
  };
  return (
    <div className="order_main">
      <Navbar />

      <div className='filter_container'>
      <button onClick={handleFilterIncomplete} className="filter_button">
        <i className='fa fa-filter'></i>
      </button>
      </div>

      <div className="order_section">
        {/* Show loader while orders are loading */}
        {loading && (
          <div className="loading-symbol">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Show error message if there's an error */}
        {error && <div className="error-message">Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>}

        {/* Show "No Orders Found" when orders are fetched but empty */}
        {!loading && !isFiltering && filteredOrders.length === 0 && (
          <div className="no-orders-message">No Orders Found</div>
        )}
        {!loading &&
          !isFiltering &&
          filteredOrders.map((order, orderIndex) =>
            order?.currentUser?._id === currentUser?._id ? (
              <div key={order._id || orderIndex}>
                  <span className='order_date'>
                    Ordered on:{' '}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : 'N/A'}
                  </span>
                {order.cartItems?.map((item, itemIndex) => (
                  <div key={item._id || itemIndex} className="order_container">
                    <div className='details_container'>
                    <div className='order_image'>
                    <img className='image' src={item.image}></img>
                    </div>

                    <div className="order_details">
                      <span className='order_item_name'>{item.name} </span>
                      <span> Variant: {item.varient || 'N/A'}</span>
                      <span> Quantity:   {item.quantity || 1}</span>
                      <span> Price:₹{item.price || 'N/A'}</span>
                    </div>
                    </div>
                      <div className="order_status">
                        {order.isDelivered ? (
                          <div className='delivered'>Delivered</div>
                        ) : (
                          <div className='not_delivered'>Not delivered</div>
                        )}
                      </div>
                  </div>
                ))}
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}

export default MyOrders;
