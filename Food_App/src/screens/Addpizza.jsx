import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addPizza } from "../actions/PizzaActions";
import "react-toastify/dist/ReactToastify.css";
import "./Addpizza.css";

function Addpizza() {
    const [name, setName] = useState("");
    const [smallprice, setSmallprice] = useState("");
    const [mediumprice, setMediumprice] = useState("");
    const [largeprice, setLargeprice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState("Homescreen");
    const [errors, setErrors] = useState({});

    const pizzaTypes = ["Homescreen", "Nonveg", "Veg", "Fruit", "Paratha", "Paneer", "Mushroom"];
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector(state => state.addPizzaReducer);

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Pizza name is required!";
        if (!smallprice || smallprice <= 0) newErrors.smallprice = "Invalid price!";
        if (!mediumprice || mediumprice <= 0) newErrors.mediumprice = "Invalid price!";
        if (!largeprice || largeprice <= 0) newErrors.largeprice = "Invalid price!";
        if (!description.trim()) newErrors.description = "Description is required!";
        if (!category.trim()) newErrors.category = "Category is required!";
        if (!image) newErrors.image = "Pizza image is required!";
        return newErrors;
    };

    const handleInputChange = (e, setter, field) => {
        setter(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, [field]: "" }));
    };

    const handlePriceChange = (e, setter, field) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 0) {
            setter(value);
            setErrors(prevErrors => ({ ...prevErrors, [field]: "" }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [field]: "Invalid price!" }));
        }
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
            page,
            category,
            prices: {
                small: Number(smallprice),
                medium: Number(mediumprice),
                large: Number(largeprice),
            }
        };

        dispatch(addPizza(pizza));
        toast.success("Pizza Added Successfully")
        setName("");
        setSmallprice("");
        setMediumprice("");
        setLargeprice("");
        setImage("");
        setDescription("");
        setCategory("");
        setPage("Homescreen");
        setErrors({});
    }

    return (
        <div className="addpizza_container">
            <div className="addpizza_card">
                <h2 className="addpizza_header">🍕 Add a New Pizza</h2>

                <form className="addpizza_form" onSubmit={formHandler}>
                    <div className="form-group">
                        <label className="form_header">Pizza Name</label>
                        <input type="text" placeholder="Enter pizza name" value={name} 
                            onChange={(e) => handleInputChange(e, setName, "name")} 
                            className={`form-control ${errors.name ? 'error' : ''}`} />
                        {errors.name && <small className="error-text">{errors.name}</small>}
                    </div>

                    <div className="form-group">
                        <label className="form_header">Small Price</label>
                        <input type="number" placeholder="₹ Small Price" value={smallprice} 
                            onChange={(e) => handlePriceChange(e, setSmallprice, "smallprice")} 
                            className={`form-control ${errors.smallprice ? 'error' : ''}`} />
                        {errors.smallprice && <small className="error-text">{errors.smallprice}</small>}
                    </div>

                    <div className="form-group">
                        <label className="form_header">Medium Price</label>
                        <input type="number" placeholder="₹ Medium Price" value={mediumprice} 
                            onChange={(e) => handlePriceChange(e, setMediumprice, "mediumprice")} 
                            className={`form-control ${errors.mediumprice ? 'error' : ''}`} />
                        {errors.mediumprice && <small className="error-text">{errors.mediumprice}</small>}
                    </div>

                    <div className="form-group">
                        <label>Large Price</label>
                        <input type="number" placeholder="₹ Large Price" value={largeprice} 
                            onChange={(e) => handlePriceChange(e, setLargeprice, "largeprice")} 
                            className={`form-control ${errors.largeprice ? 'error' : ''}`} />
                        {errors.largeprice && <small className="error-text">{errors.largeprice}</small>}
                    </div>

                    <div className="form-group">
                        <label className="form_header">Category</label>
                        <input type="text" placeholder="e.g., Veg, Non-Veg" value={category} 
                            onChange={(e) => handleInputChange(e, setCategory, "category")} 
                            className={`form-control ${errors.category ? 'error' : ''}`} />
                        {errors.category && <small className="error-text">{errors.category}</small>}
                    </div>

                    <div className="form-group">
                        <label className="form_header">Description</label>
                        <textarea placeholder="Enter pizza description" value={description} 
                            onChange={(e) => handleInputChange(e, setDescription, "description")} 
                            className={`form-control ${errors.description ? 'error' : ''}`}></textarea>
                        {errors.description && <small className="error-text">{errors.description}</small>}
                    </div>

                    <div className="form-group">
                        <label className="form_header">Pizza Screen</label>
                        <select value={page} onChange={(e) => setPage(e.target.value)} className="form-control">
                            {pizzaTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="image-upload">
                        <label className="form_header">Pizza Image</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                if (file.type.startsWith("image/")) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setImage(reader.result);
                                    reader.readAsDataURL(file);
                                    setErrors(prevErrors => ({ ...prevErrors, image: "" }));
                                } else {
                                    setErrors(prevErrors => ({ ...prevErrors, image: "Invalid image file!" }));
                                }
                            }
                        }} className={`form-control ${errors.image ? 'error' : ''}`} />
                        {errors.image && <small className="error-text">{errors.image}</small>}
                        {image && <img src={image} alt="Preview" className="image-preview" />}
                    </div>

                    <button type="submit" className="addpizza-btn">
                        {loading ? "Adding..." : "Add Pizza"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Addpizza;
