import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllPizzas,deletePizza
} from '../actions/PizzaActions';
import { Link } from 'react-router-dom';
import "./pizzlists.css";

function Pizzaslist() {
    const [page, setPage] = useState('Homescreen');

    const pizzaTypes = [
        "Homescreen", "Veg Pizzas", "Nonveg Pizzas",
        "Fruit Pizzas", "Paratha Pizzas", "Paneer Pizzas", "Mushroom Pizzas"
    ];

    const dispatch = useDispatch();

    const pizasstate = useSelector((state) => state.getAllPizzasReducer);

    const { pizzas, error, loading } = pizasstate;

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [dispatch,page]);

    const getFilteredPizzas = () => {
        if (!pizzas || pizzas.length === 0) return [];  // Ensure pizzas exist
    
        return pizzas.filter((item) => {
            if (!item.page) return false;  // Prevent undefined category errors
    
            const category = item.page.toLowerCase();
            
            switch (page) {
                case "Homescreen":
                    return item.page && item.page.includes("Homescreen");
                case "Nonveg Pizzas":
                    return item.page && item.page.includes("Nonveg");
                case "Veg Pizzas":
                    return item.page && item.page.includes("Veg");
                case "Mushroom Pizzas":
                    return item.page && item.page.includes("Mushroom");
                case "Fruit Pizzas":
                    return item.page && item.page.includes("Fruit");
                case "Paratha Pizzas":
                    return item.page && item.page.includes("Paratha");
                case "Paneer Pizzas":
                    return item.page && item.page.includes("Paneer");
                default:
                    return true; // Show all pizzas if no valid category is found
            }
        });
    };
    
    
    
    const filteredPizzas = getFilteredPizzas()


    return (
        <div className='list_main'>
            <div className='list_container'>
                <select className='screen_choice' value={page} onChange={(e) => setPage(e.target.value)}>
                    {pizzaTypes.map((type) => (
                        <option value={type} key={type}>{type}</option>
                    ))}
                </select>
                <div className='list_header_container'>
                    <h2 className='list_header'>{page}</h2>
                    <h4 className='list_count'>
                        Total Pizzas : <span>{filteredPizzas.length}</span>
                    </h4>
                </div>
            </div>
            {!loading && !error && (
                <table className="table">
                    <thead className="table-dark">
                        <tr className='table_headers'>
                            <th>Name</th>
                            <th>Prices</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table_data">
                        {filteredPizzas.map((pizza) => (
                            <tr key={pizza._id}>
                                <td className='table_pizza_name'>{pizza.name}</td>
                                <td className='table_pizza_varient'>
                                    Small: {pizza.prices[0]?.small || 'N/A'}<br />
                                    Medium: {pizza.prices[0]?.medium || 'N/A'}<br />
                                    Large: {pizza.prices[0]?.large || 'N/A'}
                                </td>
                                <td className='table_pizza_category'>{pizza.category}</td>
                                <td className='table_pizza_actions'>
                                    <i className="fa fa-trash"
                                        onClick={() => dispatch(deletePizza(pizza._id))}
                                    ></i>
                                    <Link to={`/admin/editpizza/${pizza._id}`}>
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Pizzaslist;
