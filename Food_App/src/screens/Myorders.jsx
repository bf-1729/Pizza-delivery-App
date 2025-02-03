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
                    {/* Item Details */}
                    <div className="col-md-3 item">
                      <h1 className="side">Item Name</h1>
                      <b className='myorder_pizza'>{item.name}</b>
                      <div><b>Variant:</b> {item.varient || 'N/A'}</div>
                      <div><b>Quantity: </b> {item.quantity || 1}</div>
                      <div><b>Price: </b> {item.price || 'N/A'}</div>
                    </div>
                    {/* Address */}
                    <div className="column_address col-md-3 mt-1">
                      <h1>Address</h1>
                      <div className='myorders'><b>House No: </b>{order.AddressLine1}</div>
                      <div className='myorders'><b>Area: </b> {order.AddressLine2}</div>
                      <div className='myorders'><b>Landmark: </b> {order.landmark}</div>
                      <div><b>Pincode: </b> {order.pincode}</div>
                    </div>
                    {/* Order Status */}
                    <div className="col-md-3 mt-1">
                      <h1>Order Status</h1>
                      <div className="d-flex">
                        <span><b>Status:</b> </span>
                        {order.isDelivered ? (
                          <div style={{ color: 'green' }}>Delivered</div>
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
