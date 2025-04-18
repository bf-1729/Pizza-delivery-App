import React, { useEffect, useState } from 'react';
import { UserAddress, deliverOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import './orderssscreen.css';
import Modalbootstrap from '../screens/Modalbootstrap';

function Orderscreen() {
  const dispatch = useDispatch();
  const [activeOrder, setActiveOrder] = useState(null);

  // Fetch orders when component mounts and after delivering an order
  useEffect(() => {
    dispatch(UserAddress());
  }, [dispatch]);

  useEffect(() => {
    if (activeOrder !== null) {
      dispatch(UserAddress());
    }
  }, [activeOrder, dispatch]);

  const addressstate = useSelector((state) => state.UserAddressReducer);
  const { Useraddress = { orders: [] }, loading, error } = addressstate;
  const orders = Useraddress.orders || [];

  const handleDeliver = (orderId) => {
    dispatch(deliverOrder(orderId)).then(() => {
      dispatch(UserAddress());
    });
  };

  const openModal = (order) => {
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
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr className="row_data" key={item._id}>
                <td className="order_data">{item._id}</td>
                <td className="order_data">{item.currentUser?.email}</td>
                <td className="order_data">{item.currentUser?._id}</td>
                <td className="order_datas">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td>
                  <button
                    style={{ backgroundColor: 'white', border: 'none' }}
                    onClick={() => openModal(item)}
                  >
                    <img className='details_img' src="https://img.icons8.com/ios/50/visible--v1.png" alt="visible--v1" />
                  </button>
                </td>
                <td className="order_data">
                  {item.isDelivered ? (
                    <h1 className="order_delivered">Delivered</h1>
                  ) : (
                    <button
                      className="btn orders_button btn-danger text-white"
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
