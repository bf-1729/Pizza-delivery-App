import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../actions/cartActions';
import { getAllPizzas } from '../actions/PizzaActions'; // Assuming you have a pizza action to fetch pizza data
import "./pizza.css";

function Pizza({ pizza }) {
    const [quantity, setQuantity] = useState(1);
    const [varient, setVarient] = useState("small");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [dispatch]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addtocart() {
        dispatch(addToCart(pizza, quantity, varient));
    }
    return (
        <div id='pizzascreen'>
            <div onClick={handleShow}>
                <h1 className='homepizza_name'>{pizza.name}</h1>
                <div className='pizza_header'>
                <img src={pizza.image} className='pizza_image' alt={pizza.name} /></div>
            </div>

            <div className='varient_container'>
                <div className='varients'>
                    <span className='varient_header'>Varients:</span>
                    <select
                        className='varient_choice'
                        value={varient}
                        onChange={(e) => setVarient(e.target.value)}>
                        {pizza.varients.map((variant) => (
                            <option className='pizza_choices' key={variant} value={variant}>
                                {variant}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='quantity'>
                    <span className='quantity_header'>Quantity:</span>
                    <select
                        className='quantity_choice'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}>
                        {[...Array(10).keys()].map((x, i) => (
                            <option className='pizza_choices' key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="price_container">
                <h5 className='price'>₹{pizza.prices[0][varient] * quantity}/-</h5>
                
                    <button
                        className='cart_btn'
                        onClick={addtocart}>Add to cart
                    </button>
            </div>

            <Modal className='Modal' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='Modalname'>{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body className='Modalbody'>
                    <center>
                        <img
                            src={pizza.image}
                            style={{ height: "auto", width: "100%", maxWidth: "300px" }}
                            className='Modalimg img-fluid'
                            alt={pizza.name}
                        />
                    </center>
                    <p className='Modaldesc'>{pizza.description}</p>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className='btn'
                        onClick={handleClose}
                        aria-label="Close pizza detail modal"
                    >
                        CLOSE
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Pizza;
