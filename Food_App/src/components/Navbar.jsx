import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import "./navbar.css"
import "../App.css"

function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  console.log(currentUser)
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">

      <div className="navbar_container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img className="logo rounded-circle" src="data:image/png;base64,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" />
          <span className="navs_header ms-2">PIZZA HUT</span>
        </Link>

          <ul className="profile_container navbar-nav ms-auto align-items-center">
            {currentUser ? (

              <li className="nav-item dropdown">
                <Link to={"#"} className="nav-link dropdown-toggle d-flex align-items-center" id="dropdownMenuButton" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img width="32" height="32" src="https://img.icons8.com/windows/32/FFFFFF/user-male-circle.png" alt="user-male-circle"/>
                  
                </Link>
                
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">

                  <li>
                    {currentUser.isAdmin ? (
                      <Link to={"/admin/orderslist"} className="dropdown-item">Admin Panel</Link>) : (<span></span>)}
                  </li>

                  <li>
                    <Link to={"/myorders"} className="dropdown-item">
                      My Orders
                    </Link>
                  </li>

                  <li>
                    <button className="dropdown-item" onClick={() => dispatch(logoutUser())}>
                      Logout
                    </button>
                  </li>
                  
                </ul>
                
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link login" href="/login">
                  Login
                </a>
              </li>
            )}
            {/* Cart */}

          </ul>
          <div className="cart_container nav-item">
            <Link to={"/cart"} className="nav-link cart">
              <i className="cart_icon fa fa-shopping-cart"></i>
              <span className="count"><p className="count_number">{cartState.cartItems.length}</p>

              </span>
            </Link>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;
