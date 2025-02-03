import React from 'react'
import { Link } from 'react-router-dom'
import "./pizzanavbar.css"
import "../App.css"

function PizzaNavbar() {
  return (
    <div>
        <div className='navbarpizza'>
            <Link to={"/nonvegpizza"} className='navs'>Nonveg Pizza</Link>
            <Link to={"/vegpizza"} className='navs'>Veg Pizza</Link>
            <Link to={"/fruitpizza"} className='navs'>Fruit Pizza</Link>
            <Link to={"/parathapizza"} className='navs'>Paratha Pizza</Link>
            <Link to={"/paneerpizza"} className='navs'>Paneer Pizza</Link>
            <Link to={"/mushroompizza"} className='navs'>Mushroom Pizza</Link>

        </div>
    </div>
  )
}

export default PizzaNavbar