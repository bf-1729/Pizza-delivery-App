import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homenavbar.css";

function HomeNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close sidebar when clicking outside
  const closeSidebar = (e) => {
    if (e.target.classList.contains("sidebar-overlay")) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/*Main Navbar (Visible in Desktop View) */}
      <nav className="desktop-navbar">
        <div className="container">
          <ul className="nav_links nav-links">
            <li>
              <Link to="/nonvegpizza" className="navbar_item nav-link">
              <p>NonVeg Pizza</p></Link></li>
              
            <li><Link to="/vegpizza" className="navbar_item nav-link">
            Veg Pizza</Link></li>

            <li><Link to="/fruitpizza" className="navbar_item nav-link">
            Fruit Pizza</Link></li>

            <li>
              <Link to="/parathapizza" className="navbar_item nav-link">
              Paratha Pizza</Link></li>
              
            <li><Link to="/paneerpizza" className="navbar_item nav-link">
            Paneer Pizza</Link></li>

            <li><Link to="/mushroompizza" className="navbar_item nav-link">
            Mushroom Pizza</Link></li>
          </ul>
        </div>
      </nav>

      {/*Mobile Navbar (Toggler Button) */}
      <nav className="mobile-navbar">
        <button className="navbar-toggler" onClick={toggleSidebar}>
        <img width="27" height="30" src="https://img.icons8.com/ios-filled/50/menu--v6.png" alt="menu--v6"/>
        </button>
      </nav>

      {/*Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/*Sidebar (Only in Mobile View) */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={toggleSidebar}><img width="24" height="24" src="https://img.icons8.com/windows/32/FFFFFF/delete-sign.png" alt="delete-sign"/></button>
        <ul className="sidebar-menu">
          <li><Link to="/nonvegpizza" className="sidebar-link" onClick={toggleSidebar}>NonVeg Pizza</Link></li>
          <li><Link to="/vegpizza" className="sidebar-link" onClick={toggleSidebar}>Veg Pizza</Link></li>
          <li><Link to="/fruitpizza" className="sidebar-link" onClick={toggleSidebar}>Fruit Pizza</Link></li>
          <li><Link to="/parathapizza" className="sidebar-link" onClick={toggleSidebar}>Paratha Pizza</Link></li>
          <li><Link to="/paneerpizza" className="sidebar-link" onClick={toggleSidebar}>Paneer Pizza</Link></li>
          <li><Link to="/mushroompizza" className="sidebar-link" onClick={toggleSidebar}>Mushroom Pizza</Link></li>
        </ul>
      </div>
    </>
  );
}

export default HomeNavbar;
