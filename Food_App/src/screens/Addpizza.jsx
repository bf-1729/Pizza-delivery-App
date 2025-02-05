import React, { useState } from 'react';
import Loading from '../components/Loading';
import Error from '../components/Error';
import "./Addpizza.css";
import Success from "../components/Success";
import { addPizza } from '../actions/PizzaActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addpizza() {
    const [name, setName] = useState('');
    const [smallprice, setSmallprice] = useState('');
    const [mediumprice, setMediumprice] = useState('');
    const [largeprice, setLargeprice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [choice, setChoice] = useState('Homescreen');
    const [errors, setErrors] = useState({});

    const pizzaType = ["Nonveg", "Veg", "Fruit", "Paratha", "Paneer", "Mushroom"];
    const dispatch = useDispatch();
    const addpizzasstate = useSelector(state => state.addPizzaReducer);
    const { success, error, loading } = addpizzasstate;

    // ✅ Validation function
    const validate = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = "Pizza name is required!";
            toast.error("🚨 Pizza name is required!");
        }
        if (!smallprice || smallprice <= 0) {
            newErrors.smallprice = "Small price must be a positive number!";
            toast.error("⚠️ Small price must be a positive number!");
        }
        if (!mediumprice || mediumprice <= 0) {
            newErrors.mediumprice = "Medium price must be a positive number!";
            toast.error("⚠️ Medium price must be a positive number!");
        }
        if (!largeprice || largeprice <= 0) {
            newErrors.largeprice = "Large price must be a positive number!";
            toast.error("⚠️ Large price must be a positive number!");
        }
        if (!description.trim()) {
            newErrors.description = "Description is required!";
            toast.error("📝 Description is required!");
        }
        if (!category.trim()) {
            newErrors.category = "Category is required!";
            toast.error("📂 Category is required!");
        }
        return newErrors;
    };

    function formHandler(e) {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const pizza = {
            name,
            image,
            description,
            choice,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice
            }
        };

        dispatch(addPizza(pizza));

        // Reset form
        setName('');
        setSmallprice('');
        setMediumprice('');
        setLargeprice('');
        setImage('');
        setDescription('');
        setCategory('');
        setChoice('Homescreen');
        setErrors({});
    }

    return (
        <div>
            <div className='addpizza text-left'>
                {loading && <Loading />}
                {error && <Error error="Failed to load" />}
                {success && <Success success="New Pizza Added Successfully!" />}

                <h2 className='addpizza_header'>Add Pizza</h2>
                <form onSubmit={formHandler} className='ms-3'>
                    <select className='form-control w-100'
                        style={{ cursor: "pointer" }}
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                    >
                        <option value={choice}>{choice}</option>
                        {pizzaType.map(choice => (
                            <option value={choice} key={choice}>{choice}</option>
                        ))}
                    </select>

                    <div className="form-group">
                        <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} type='text' placeholder='Pizza Name' value={name} onChange={(e) => setName(e.target.value)} />

                    </div>

                    <div className="form-group">
                        <input className={`form-control ${errors.smallprice ? 'is-invalid' : ''}`} type='number' placeholder='Small variant price' value={smallprice} onChange={(e) => setSmallprice(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <input className={`form-control ${errors.mediumprice ? 'is-invalid' : ''}`} type='number' placeholder='Medium variant price' value={mediumprice} onChange={(e) => setMediumprice(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <input className={`form-control ${errors.largeprice ? 'is-invalid' : ''}`} type='number' placeholder='Large variant price' value={largeprice} onChange={(e) => setLargeprice(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <input
                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (file) {
                                    if (!file.type.startsWith("image/")) {
                                        setErrors((prev) => ({ ...prev, image: "Only image files are allowed!" }));
                                        toast.error("📷 Only image files (jpg, png) are allowed!");
                                        return;
                                    }

                                    if (file.size > 2 * 1024 * 1024) { // 2MB limit
                                        setErrors((prev) => ({ ...prev, image: "File size must be under 2MB!" }));
                                        toast.error("🚀 File size should be under 2MB!");
                                        return;
                                    }

                                    setErrors((prev) => ({ ...prev, image: "" })); // Clear errors

                                    
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImage(reader.result); // Store the image URL in state
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                    </div>

                    {image && (
                        <img
                            src={image}
                            alt="Preview"
                            className="mt-3"
                            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                        />
                    )}


                    <div className="form-group">
                        <input className={`form-control ${errors.description ? 'is-invalid' : ''}`} type='text' placeholder='Pizza Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <input className={`form-control mb-4 ${errors.category ? 'is-invalid' : 'j'}`} type='text' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>

                    <button className='w-100 addpizza_btn'>Add New Pizza</button>
                </form>
            </div>
        </div>
    );
}

export default Addpizza;
