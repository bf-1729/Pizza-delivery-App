import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Modal } from 'react-bootstrap';
import "../screens/nonvegs.css"

function Fruitpizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState("small");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  return (
    <div className="section_pizza_container">
      <h3 className="pizza_name">{pizza.name}</h3>
      <img onClick={handleShow} src={pizza.image} className='pizza_images' alt={pizza.name} />
      <div className="details_section">
        <p className="price">₹{pizza.prices[0][varient] * quantity}/-</p>

        <div className="dropdown_section">
          {/* Varient Dropdown */}
          <select className="varient" value={varient} onChange={(e) => setVarient(e.target.value)}>
            {pizza.varients.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          {/* Quantity Dropdown */}
          <select className="quantities" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            {[...Array(10).keys()].map((x, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button className="cart_button" onClick={(e) => {
          e.stopPropagation();
          dispatch(addToCart(pizza, quantity, varient));
        }}>
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
            <img src={pizza.image} alt={pizza.name} className="modal_image"/>
          </center>
          <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-secondary close_button">Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Fruitpizza;
