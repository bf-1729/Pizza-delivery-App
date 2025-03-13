import React from 'react'
import { Link } from 'react-router-dom'
import "./pizzanavbar.css"
import "../App.css"

function PizzaNavbar() {
  return (
    <div>
        <div className='navbarpizza'>
            <Link to={"/nonvegpizza"} className='navs'>Nonveg Pizzas</Link>
            <Link to={"/vegpizza"} className='navs'>Veg Pizzas</Link>
            <Link to={"/mushroompizza"} className='navs'>Mushroom Pizzas</Link>
            <Link to={"/parathapizza"} className='navs'>Paratha Pizzas</Link>
            <Link to={"/paneerpizza"} className='navs'>Paneer Pizzas</Link>
            <Link to={"/fruitpizza"} className='navs'>Fruit Pizzas</Link>

        </div>
    </div>
  )
}

export default PizzaNavbar