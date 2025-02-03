import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Modal } from 'react-bootstrap';

function Paneerpizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState("small");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: '90%',
        margin: '0px auto',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <h3 style={{ fontWeight: '700', fontSize: '1.4rem',marginTop:"7%", marginBottom: '7%' }}>
          {pizza.name}
        </h3>
      {/* Image Section */}
      <div
        style={{
          height: '240px',
          width:"240px",
          background: `url(${pizza.image}) no-repeat center center/cover`,
          borderRadius:"10px"
          
        }}
        className='imagess'
        onClick={handleShow}
      ></div>

      {/* Details Section */}
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          marginLeft:"-40px"
        }}
        className='sections'
      >
        
        <p
          style={{
            fontSize: '1rem',
            color: '#FFFFFF',
            marginBottom: '15px',
            marginLeft:"42px"
          }}
        >
          ₹{pizza.prices[0][varient] * quantity}/-
        </p>

        <div className="d-flex justify-content-center align-items-center mb-3">
          {/* Varients Dropdown */}
          <select
            value={varient}
            className='quantity'
            onChange={(e) => setVarient(e.target.value)}
            style={{
              width:"100px",
              border: '1px solid #ddd',
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              marginLeft: '34px',
            }}
          >
            {pizza.varients.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          {/* Quantity Dropdown */}
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{
              width:"100px",
              border: '1px solid #ddd',
              padding: '5px 18px',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              marginLeft:"8px"
            }}
            className='quantity'
          >
            {[...Array(10).keys()].map((x, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button
        className='cart_button'
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(pizza, quantity, varient));
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <img
              src={pizza.image}
              alt={pizza.name}
              className="img-fluid"
              style={{
                height: '300px',
                width: '300px',
                borderRadius: '10px',
                marginBottom: '15px',
              }}
            />
          </center>
          <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            className="btn btn-secondary"
            style={{
              borderRadius: '20px',
              padding: '5px 15px',
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Paneerpizza;
