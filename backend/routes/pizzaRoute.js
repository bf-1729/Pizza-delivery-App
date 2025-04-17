const express = require("express");
const router = express.Router();
const Pizza = require("../model/pizzaModel");

// Get all pizzas
router.get("/getallpizzas", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // or 20, based on your needs
    const skip = (page - 1) * limit;

    try {
        const pizzas = await Pizza.find({}).skip(skip).limit(limit).lean();
        const total = await Pizza.countDocuments();

        res.json({ success: true, pizzas, totalPages: Math.ceil(total / limit), currentPage: page });
    } catch (error) {
        console.error("Error fetching pizzas:", error);
        res.json({ success: false, message: error.message });
    }
});


// Add new pizza
router.post("/addpizza", async (req, res) => {
    const pizza = req.body.pizza;
    try {
        const newpizza = new Pizza({
            name: pizza.name,
            image: pizza.image,
            varients: ["small", "medium", "large"],
            page: pizza.page,
            description: pizza.description,
            category: pizza.category,
            prices: pizza.prices, // ✅ FIXED
        });
        await newpizza.save();
        
        res.status(201).json({ message: "New Pizza Added Successfully" });
    } catch (error) {
        console.error("Error adding pizza:", error);
        return res.status(400).json({ message: "Failed to add pizza", error });
    }
});

// Get pizza by ID
router.post("/getpizzabyid", async (req, res) => {
    const pizzaId = req.body.pizzaid;

    try {
        const pizza = await Pizza.findOne({ _id: pizzaId }); // ✅ FIXED

        if (pizza) {
            return res.status(200).json(pizza);
        }
        return res.status(404).json({ message: "Pizza not found" });
    } catch (error) {
        console.error("Error fetching pizza:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Edit pizza
router.post("/editpizza", async (req, res) => {
    const editedpizza = req.body.editedpizza;

    try {
        const pizza = await Pizza.findOne({ _id: editedpizza._id });

        if (pizza) {
            pizza.name = editedpizza.name;
            pizza.description = editedpizza.description;
            pizza.image = editedpizza.image;
            pizza.category = editedpizza.category;
            pizza.prices = editedpizza.prices; // ✅ FIXED
            pizza.page = editedpizza.page;

            await pizza.save();
            return res.status(200).json({ message: "Pizza updated successfully" });
        }
        return res.status(404).json({ message: "Pizza not found" });
    } catch (error) {
        console.error("Error editing pizza:", error);
        return res.status(400).json({ message: "Failed to edit pizza", error });
    }
});

// Delete pizza
router.post("/deletepizza", async (req, res) => {
    const pizzaId = req.body.pizzaid;

    try {
        const result = await Pizza.findOneAndDelete({ _id: pizzaId });

        if (result) {
            return res.status(200).json({ message: "Pizza deleted successfully" });
        }
        return res.status(404).json({ message: "Pizza not found" });
    } catch (error) {
        console.error("Error deleting pizza:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;