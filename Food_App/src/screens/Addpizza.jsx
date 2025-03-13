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
    const [choice, setChoice] = useState("Homescreen");
    const [errors, setErrors] = useState({});

    const pizzaTypes = ["Home","Nonveg", "Veg", "Fruit", "Paratha", "Paneer", "Mushroom"];
    const dispatch = useDispatch();
    const { success, error, loading } = useSelector(state => state.addPizzaReducer);

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Pizza name is required!";
        if (!smallprice || smallprice <= 0) newErrors.smallprice = "Invalid price!";
        if (!mediumprice || mediumprice <= 0) newErrors.mediumprice = "Invalid price!";
        if (!largeprice || largeprice <= 0) newErrors.largeprice = "Invalid price!";
        if (!description.trim()) newErrors.description = "Description is required!";
        if (!category.trim()) newErrors.category = "Category is required!";
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
                small: Number(smallprice),
                medium: Number(mediumprice),
                large: Number(largeprice)
            }
        };

        dispatch(addPizza(pizza));
        toast.success("🍕 Pizza added successfully!");

        // Reset form
        setName("");
        setSmallprice("");
        setMediumprice("");
        setLargeprice("");
        setImage("");
        setDescription("");
        setCategory("");
        setChoice("Homescreen");
        setErrors({});
    }

    return (
        <div className="addpizza_container">
            <div className="addpizza_card">
                <h2 className="addpizza_header">🍕 Add a New Pizza</h2>

                <form className="addpizza_form" onSubmit={formHandler}>
                    <div className="form-group">
                        <label className="form_header">Pizza Name</label>
                        <input type="text" placeholder="Enter pizza name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label className="form_header">Small Price</label>
                        <input type="number" placeholder="₹ Small Price" value={smallprice} onChange={(e) => setSmallprice(e.target.value)} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label className="form_header">Medium Price</label>
                        <input type="number" placeholder="₹ Medium Price" value={mediumprice} onChange={(e) => setMediumprice(e.target.value)} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Large Price</label>
                        <input type="number" placeholder="₹ Large Price" value={largeprice} onChange={(e) => setLargeprice(e.target.value)} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label className="form_header">Category</label>
                        <input type="text" placeholder="e.g., Veg, Non-Veg" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label className="form_header">Description</label>
                        <textarea placeholder="Enter pizza description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form_header">Pizza Screen</label>
                        <select value={choice} onChange={(e) => setChoice(e.target.value)} className="form-control">
                            {pizzaTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="image-upload">
                    <label className="form_header">Pizza Image</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.type.startsWith("image/")) {
                                const reader = new FileReader();
                                reader.onloadend = () => setImage(reader.result);
                                reader.readAsDataURL(file);
                            }
                        }} className="form-control" />
                        {image && <img src={image} alt="Preview" className="image-preview" />}
                    </div>

                    <button type="submit" className="addpizza-btn">{loading ? "Adding..." : "Add Pizza"}</button>
                </form>
            </div>
        </div>
    );
}

export default Addpizza;
