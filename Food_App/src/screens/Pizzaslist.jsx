import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getAllPizzas, deletePizza, getAllVegPizzas, 
    getAllNonVegPizzas, getAllFruitPizzas, 
    getAllParathaPizzas, getAllPaneerPizzas, 
    getAllMushroomPizzas 
} from '../actions/PizzaActions';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import "./pizzlists.css";

function Pizzaslist() {
    const [choice, setChoice] = useState('Homescreen');
    
    const pizzaTypes = [
        "Homescreen", "Veg Pizzas", "Nonveg Pizzas",
        "Fruit Pizzas", "Paratha Pizzas", "Paneer Pizzas", "Mushroom Pizzas"
    ];

    const dispatch = useDispatch();

    const pizasstate = useSelector((state) => state.getAllPizzasReducer);
    const nonvegpizzastate = useSelector((state) => state.getAllNonVegPizzasReducer);
    const vegpizzastate = useSelector((state) => state.getAllVegPizzasReducer);
    const fruitpizzastate = useSelector((state) => state.getAllFruitPizzasReducer);
    const parathapizzastate = useSelector((state) => state.getAllParathaPizzasReducer);
    const paneerpizzastate = useSelector((state) => state.getAllPaneerPizzasReducer);
    const mushroompizzastate = useSelector((state) => state.getAllMushroomPizzasReducer);

    const { pizzas, error, loading } = pizasstate;
    const { nonvegpizzas } = nonvegpizzastate;
    const { vegpizzas } = vegpizzastate;
    const { fruitpizzas } = fruitpizzastate;
    const { parathapizzas } = parathapizzastate;
    const { paneerpizzas } = paneerpizzastate;
    const { mushroompizzas } = mushroompizzastate;

    useEffect(() => {
        switch (choice) {
            case 'Nonveg Pizzas': dispatch(getAllNonVegPizzas()); break;
            case 'Veg Pizzas': dispatch(getAllVegPizzas()); break;
            case 'Fruit Pizzas': dispatch(getAllFruitPizzas()); break;
            case 'Paratha Pizzas': dispatch(getAllParathaPizzas()); break;
            case 'Paneer Pizzas': dispatch(getAllPaneerPizzas()); break;
            case 'Mushroom Pizzas': dispatch(getAllMushroomPizzas()); break;
            default: dispatch(getAllPizzas());
        }
    }, [dispatch, choice]);

    const getFilteredPizzas = () => {
        switch (choice) {
            case 'Nonveg Pizzas': return nonvegpizzas || [];
            case 'Veg Pizzas': return vegpizzas || [];
            case 'Fruit Pizzas': return fruitpizzas || [];
            case 'Paratha Pizzas': return parathapizzas || [];
            case 'Paneer Pizzas': return paneerpizzas || [];
            case 'Mushroom Pizzas': return mushroompizzas || [];
            default: return pizzas || [];
        }
    };

    const filteredPizzas = getFilteredPizzas();

    return (
        <div className='list_main'>
            <div className='list_container'>
                <select className='screen_choice' value={choice} onChange={(e) => setChoice(e.target.value)}>
                    {pizzaTypes.map((type) => (
                        <option value={type} key={type}>{type}</option>
                    ))}
                </select>
                <div className='list_header_container'>
                    <h2 className='list_header'>{choice}</h2>
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
