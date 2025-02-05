import React from 'react';
import { Modal } from 'react-bootstrap';
import "./Modal.css";

function Modalbootstrap({ order, onClose }) {
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton className='header'>
        <Modal.Title>
          <div className="d-flex">
            <h1 className="me-5" style={{fontSize:"1.8rem"}}>Order Details</h1>
            <h6 className="amount-highlight ms-5 mt-2">Amount: ₹{order.Amount}</h6>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='body'>
        <div className='address_conatiner'>
          <div>
        <p className='modal_data'><strong>Order ID:</strong> {order._id}</p>
        <p className='modal_data'><strong>Mobile Number:</strong> {order.number}</p>
        <p className='modal_data'><strong>Address Line 1:</strong> {order.AddressLine1}</p>
        <p className='modal_data'><strong>Address Line 2:</strong> {order.AddressLine2 || 'N/A'}</p></div><div>
        <p className='modal_data'><strong>Landmark:</strong> {order.landmark || 'N/A'}</p>
        <p className='modal_data'><strong>Pincode:</strong> {order.pincode}</p>
        <p className='modal_data'><strong>State:</strong> {order.state}</p>
        </div>
        </div>
        <table className="table table-bordered details">
          <thead>
            <tr>
              <th>Pizza Name</th>
              <th>Varient</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.varient}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}



export default Modalbootstrap;
