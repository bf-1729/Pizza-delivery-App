import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { AddressUser } from '../actions/orderActions';
import "./Address.css"
import { addToCart } from '../actions/cartActions';
import { loginUser } from '../actions/userActions';
import { toast } from 'react-toastify';

function Addressscreen() {
  useEffect(()=>{
    dispatch(addToCart)
  })
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loginUser)
  })
  
  const { loading } = useSelector((state) => state.AddressUserReducer);
  const cartstate = useSelector(state=>state.cartReducer)
  const userstate = useSelector(state=>state.loginUserReducer)
  const {currentUser} = userstate
  const cartItems = Array.isArray(cartstate.cartItems) ? cartstate.cartItems : [];
  var Amount = 0
  for(var i=0;i<cartItems.length;i++){
    Amount = Amount+cartItems[i].price
  }

  // const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [AddressLine1, setAddressLine1] = useState('');
  const [AddressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');

  const [errors, setErrors] = useState({});

  const states = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 
    'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
    'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];
  
  const countries = ['India'];

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!/^\d{10}$/.test(number)) newErrors.number = 'Enter a valid 10-digit mobile number.';
    if (!AddressLine1.trim()) newErrors.AddressLine1 = 'Address Line 1 is required.';
    if (!AddressLine2.trim()) newErrors.AddressLine2 = 'Address Line 2 is required.';
    if (!landmark.trim()) newErrors.landmark = 'Landmark is required.';
    if (!/^\d{6}$/.test(pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode.';
    if (!state) newErrors.state = 'State is required.';
    if (!country) newErrors.country = 'Country is required.';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const address = {
      name,
      number,
      AddressLine1,
      AddressLine2,
      landmark,
      pincode,
      state,
      country,
      cartItems,
      currentUser,
      Amount
    };
    dispatch(AddressUser(address));
    localStorage.removeItem('cartItems')
    window.location.href = '/myorders'; // Redirect after successful submission
  };

  return (
    <div className="form mt-2 p-4 shadow-lg">
      <div className='adds_header d-flex'>
      <h4 className='header_text'>Address for Order</h4>
      <Link to={"/cart"} className='header_link'>Cancel</Link>
      </div>
      <div className="containers">
        <select
          className="country_selectors col-md-8"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <div className="text-danger">{errors.country}</div>}

        <div className="input_container col-md-8">
          <label>Full name</label>
          <input
            className="input_vals"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="input_container col-md-8">
          <label>Mobile number</label>
          <input
            maxLength="10"
            className="input_vals"
            type="number"
            placeholder="enter number without country code*"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          {errors.number && <div className="text-danger">{errors.number}</div>}
        </div>

        <div className="input_container col-md-8">
          <label>House no., Building, Apartment, Company</label>
          <input
            className="input_vals"
            type="text"
            value={AddressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
          {errors.AddressLine1 && <div className="text-danger">{errors.AddressLine1}</div>}
        </div>

        <div className="input_container col-md-8">
          <label>Area, Street, Village</label>
          <input
            className="input_vals"
            type="text"
            value={AddressLine2}
            required
            onChange={(e) => setAddressLine2(e.target.value)}
          />
          {errors.AddressLine2 && <div className="text-danger">{errors.AddressLine2}</div>}
        </div>

        <div className="input_container col-md-8">
          <label>Landmark</label>
          <input
            className="input_vals"
            type="text"
            placeholder="ex. near gramina bank"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
          />
          {errors.landmark && <div className="text-danger">{errors.landmark}</div>}
        </div>

        <div className="footer_container col-md-8">
          <div className="bottom_container col-md-4">
            <label>Pincode</label>
            <input
              className="pincode"
              type="text"
              maxLength="6"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
          </div>
          <div className="bottom_container">
            <label>State</label>
            <select
              className="state_selectors"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <div className="text-danger">{errors.state}</div>}
          </div>
        </div>

        {loading ? (
          <button className="btn btn-primary" disabled>
            Submitting...
          </button>
        ) : (
          <button className="address_button btn btn-primary col-md-8" onClick={handleSubmit}>
            Delivery Here ₹{Amount}/-
          </button>
        )}
      </div>
    </div>
  );
}

export default Addressscreen;
