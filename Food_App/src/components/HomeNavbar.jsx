import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homenavbar.css";

function HomeNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (e) => {
    if (e.target.classList.contains("sidebar-overlay")) {
      setIsSidebarOpen(false);
    }
  };

  const menuItems = [
    { path: "/nonvegpizza", label: "NonVeg Pizzas" },
    { path: "/vegpizza", label: "Veg Pizzas" },
    { path: "/fruitpizza", label: "Fruit Pizzas" },
    { path: "/parathapizza", label: "Paratha Pizzas" },
    { path: "/paneerpizza", label: "Paneer Pizzas" },
    { path: "/mushroompizza", label: "Mushroom Pizzas" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="desktop-navbar" role="navigation">
        <div className="container">
          <ul className="nav_links nav-links">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="navbar_item nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="mobile-navbar">
        <button 
          className="fixed-top navbar-toggler" 
          onClick={toggleSidebar}
          aria-label="Open Sidebar Menu"
        >
          <img width="27" height="30" src="https://img.icons8.com/ios-filled/50/menu--v6.png" alt="menu icon"/>
        </button>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={toggleSidebar} aria-label="Close Sidebar">
          <img width="24" height="24" src="https://img.icons8.com/windows/32/FFFFFF/delete-sign.png" alt="close icon"/>
        </button>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="sidebar-link" onClick={toggleSidebar}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomeNavbar;
