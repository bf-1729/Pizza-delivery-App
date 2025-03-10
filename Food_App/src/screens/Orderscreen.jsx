import React, { useEffect, useState } from 'react';
import { UserAddress, deliverOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import './orderssscreen.css';
import Modalbootstrap from '../screens/Modalbootstrap';

function Orderscreen() {
  const dispatch = useDispatch();
  const [activeOrder, setActiveOrder] = useState(null);

  // Fetch User Orders on Component Mount
  useEffect(() => {
    dispatch(UserAddress());
  }, [dispatch]);

  // Fetch Updated Orders When an Order is Delivered
  useEffect(() => {
    dispatch(UserAddress());
  }, [activeOrder]);

  const addressstate = useSelector((state) => state.UserAddressReducer);
  const { Useraddress = [], loading, error } = addressstate;

  // Debugging Logs
  console.log("User Orders Data:", Useraddress);

  const handleDeliver = (orderId) => {
    dispatch(deliverOrder(orderId)).then(() => {
      dispatch(UserAddress()); // Refetch orders after marking as delivered
    });
  };

  const openModal = (order) => {
    console.log("Opening Modal for Order:", order);
    setActiveOrder(order);
  };

  const closeModal = () => {
    setActiveOrder(null);
  };
  if (error) return <div>{error}</div>;

  return (
    <div className='orderlist'>
      <h2 className="order_header">Orders</h2>
      <table className="order_table table">
        <thead className="table-dark">
          <tr className="ordertable_header">
            <th>Order_ID</th>
            <th>Email</th>
            <th>User_ID</th>
            <th>Date</th>
            <th className='details'>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="body">
          {Useraddress.length > 0 ? (
            Useraddress.map((item) => (
              <tr className="row_data" key={item._id}>
                <td className="order_data">{item._id}</td>
                <td className="order_data">{item.currentUser.email}</td>
                <td className="order_data">{item.currentUser._id}</td>
                <td className="order_datas">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td>
                  <button
                    style={{ backgroundColor: 'white', border: 'none' }}
                    onClick={() => openModal(item)}
                  >
                    <img className='details_img' src="https://img.icons8.com/ios/50/visible--v1.png" alt="visible--v1"/>
                  </button>
                </td>
                <td className="order_data">
                  {item.isDelivered ? (
                    <h1 className="order_delivered">Delivered</h1>
                  ) : (
                    <button
                      className="btn order_button btn-danger text-white"
                      onClick={() => handleDeliver(item._id)}
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {activeOrder && (
        <Modalbootstrap order={activeOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default Orderscreen;
