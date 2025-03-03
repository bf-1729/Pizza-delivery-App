import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addToCart } from '../actions/cartActions';
import "./pizza.css";
import "../App.css";

function LatestPizza({ pizza }) {
    const [quantity, setQuantity] = useState(1);
    const [varient, setVarient] = useState("small");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (pizza) {
            setLoading(false);
        }
    }, [pizza]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addtocart() {
        dispatch(addToCart(pizza, quantity, varient));
    }

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div id="pizzascreen">
            <center>
                <div onClick={handleShow}>
                    <h1 className='homepizza_name text-left'>{pizza.name}</h1>
                    <div>
                        <img src={pizza.image} className='pizza_image' alt={pizza.name} />
                    </div>
                </div>

                <div className='pizza_footer'>
                    <div className='m-1'>
                        <div className='varient_header'>Varients:</div>
                        <select className='varient_selects' value={varient} onChange={(e) => setVarient(e.target.value)}>
                            {pizza.varients.map((variant) => (
                                <option className='pizza_choices' key={variant} value={variant}>
                                    {variant}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='m-1'>
                        <div className='quantity_header'>Quantity:</div>
                        <select className='quantity_selects' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            {[...Array(10).keys()].map((x, i) => (
                                <option className='pizza_choices' key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="btn_footer">
                    <div className='pizza_price m-1'>
                        <h5 className='varient_price'>₹{pizza.prices[0][varient] * quantity}/-</h5>
                    </div>
                    <div>
                        <button
                            className='home_btn'
                            onClick={addtocart}
                            aria-label={`Add ${pizza.name} to cart`}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </center>

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
                    <button className='btn' onClick={handleClose} aria-label="Close pizza detail modal">
                        CLOSE
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LatestPizza;
