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
      {/* Filter Button */}
      <button onClick={handleFilterIncomplete} className="filter-button mt-5">
        Pending orders <i className='fa fa-filter'></i>
      </button>
      <div className="order_section">
        {/* Loading States */}
        {loading && <div>Loading...</div>}
        {isFiltering && <div className="loading-symbol"><div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div></div>}
        {error && (
          <div>Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>
        )}
        {!loading && !isFiltering && filteredOrders.length === 0 && (
          <div>No Incomplete orders found.</div>
        )}
        {!loading &&
          !isFiltering &&
          filteredOrders.map((order, orderIndex) =>
            order?.currentUser?._id === currentUser?._id ? (
              <div key={order._id || orderIndex}>
                <div className="order_date">
                  <h2>
                    Ordered on:{' '}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : 'N/A'}
                  </h2>
                </div>
                {order.cartItems?.map((item, itemIndex) => (
                  <div key={item._id || itemIndex} className="order_container">
                    
                    <div className='col-md-2 item'>
                    <img className='image' src={item.image}></img>
                    </div>

                    <div className="col-md-6 item">
                      <div>{item.name} </div>
                      <div> Variant: {item.varient || 'N/A'}</div>
                      <div> Quantity:   {item.quantity || 1}</div>
                      <div> Price:   {item.price || 'N/A'}</div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="status">
                        {order.isDelivered ? (
                          <div className='delivered' style={{ color: 'green' }}>Delivered</div>
                        ) : (
                          <div style={{ color: 'red' }}>Not delivered</div>
                        )}
                      </div>
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
