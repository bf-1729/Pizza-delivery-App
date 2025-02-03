import React, { useEffect, useState } from 'react';
import { UserAddress } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder } from '../actions/orderActions';
import './orderssscreen.css';
import Modalbootstrap from './modalbootstrap';

function Orderscreen() {
  const dispatch = useDispatch();
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    dispatch(UserAddress());
  }, [dispatch]);

  const addressstate = useSelector((state) => state.UserAddressReducer);
  const { Useraddress = [], loading, error } = addressstate;

  const handleDeliver = (orderId) => {
    dispatch(deliverOrder(orderId));
  };

  const openModal = (order) => {
    setActiveOrder(order);
  };

  const closeModal = () => {
    setActiveOrder(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="order_header">Orders</h2>
      <table className="order_table table col-md-10">
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
          {Useraddress.map((item) => (
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
                  <img
                    className="details_img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiCPwnP4te78eCU5N84jP4N16qdqoMdtbCw&s"
                    alt="Order Details"
                    width="30px"
                  />
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
          ))}
        </tbody>
      </table>

      {activeOrder && (
        <Modalbootstrap order={activeOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default Orderscreen;
