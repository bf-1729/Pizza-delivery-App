const express = require("express")
const router = express.Router()
const Pizza = require("../model/pizzaModel")
const nonvegPizza = require("../model/NonvegPizza")
const vegPizza = require("../model/VegPizza")
const fruitPizza = require("../model/fruitPizza")
const parathaPizza = require("../model/parathaPizza")
const paneerPizza = require("../model/paneerPizza")
const mushroomPizza = require("../model/mushroomPizza")

router.get("/getallpizzas", async (req, res) => {
    try {
        const pizzas = await Pizza.find({}).linit(10).lean(); // Faster query
        res.status(200).json(pizzas);
    } catch (error) {
        console.error("Error fetching pizzas:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/getallnonvegpizzas", async (req, res) => {
    try {
        const pizza = await nonvegPizza.find({}).lean()
        res.status(200).json(pizzas);
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallvegpizzas", async (req, res) => {
    try {
        const pizza = await vegPizza.find({}).lean()
        res.status(200).json(pizzas);
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallfruitpizzas", async (req, res) => {
    try {
        const pizza = await fruitPizza.find({}).lean()
        res.status(200).json(pizzas);
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallparathapizzas", async (req, res) => {
    try {
        const pizza = await parathaPizza.find({}).lean()
        res.status(200).json(pizzas);
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallpaneerpizzas", async (req, res) => {
    try {
        const pizza = await paneerPizza.find({}).lean()
        res.status(200).json(pizzas);
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallmushroompizzas", async (req, res) => {
    try {
        const pizza = await mushroomPizza.find({}).lean()
        res.status(200).json(pizzas);
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/addpizza", async (req, res) => {
    const pizza = req.body.pizza
    try {
        if (pizza.choice == "Homescreen") {
            const newpizza = new Pizza({
                name: pizza.name,
                image: pizza.image,
                varients: ["small", "medium", "large"],
                description: pizza.description,
                category: pizza.category,
                prices: [pizza.prices]
            })
            await newpizza.save()
            console.log(pizza.choice)
            res.send("New Pizza Added Successfully")
        }
        else if (pizza.choice == "Nonveg") {
            const newpizza = new nonvegPizza({
                name: pizza.name,
                image: pizza.image,
                varients: ["small", "medium", "large"],
                description: pizza.description,
                category: pizza.category,
                prices: [pizza.prices]
            })
            await newpizza.save()
            console.log(pizza.choice)
            res.send("New Pizza Added Successfully")
        }
        else if (pizza.choice == "Veg") {
            const newpizza = new vegPizza({
                name: pizza.name,
                image: pizza.image,
                varients: ["small", "medium", "large"],
                description: pizza.description,
                category: pizza.category,
                prices: [pizza.prices]
            })
            await newpizza.save()
            console.log(pizza.choice)
            res.send("New Pizza Added Successfully")
        }
        else if (pizza.choice == "Fruit") {
            const newpizza = new fruitPizza({
                name: pizza.name,
                image: pizza.image,
                varients: ["small", "medium", "large"],
                description: pizza.description,
                category: pizza.category,
                prices: [pizza.prices]
            })
            await newpizza.save()
            console.log(pizza.choice)
            res.send("New Pizza Added Successfully")
        }
        else if (pizza.choice == "Paratha") {
            const newpizza = new parathaPizza({
                name: pizza.name,
                image: pizza.image,
                varients: ["small", "medium", "large"],
                description: pizza.description,
                category: pizza.category,
                prices: [pizza.prices]
            })
            await newpizza.save()
            console.log(pizza.choice)
            res.send("New Pizza Added Successfully")
        }
        else if (pizza.choice == "Paneer") {
            const newpizza = new paneerPizza({
                name: pizza.name,
                image: pizza.image,
                varients: ["small", "medium", "large"],
                description: pizza.description,
                category: pizza.category,
                prices: [pizza.prices]
            })
            await newpizza.save()
            console.log(pizza.choice)
            res.send("New Pizza Added Successfully")
        }
        else if (pizza.choice == "Mushroom") {
            const newpizza = new mushroomPizza({
                name: pizza.name,
                image: pizza.image,
                varients: ["small", "medium", "large"],
                description: pizza.description,
                category: pizza.category,
                prices: [pizza.prices]
            })
            await newpizza.save()
            console.log(pizza.choice)
            res.send("New Pizza Added Successfully")
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/getpizzabyid", async (req, res) => {
    const pizzaId = req.body.pizzaid;

    try {
        const collections = [Pizza, vegPizza, nonvegPizza, fruitPizza, parathaPizza, paneerPizza, mushroomPizza];

        const results = await Promise.all(collections.map(collection => collection.findOne({ _id: pizzaId }).lean()));

        const pizza = results.find(p => p); // Get the first non-null result

        if (pizza) {
            return res.status(200).json(pizza);
        }

        return res.status(404).json({ message: "Pizza not found" });
    } catch (error) {
        console.error("Error fetching pizza:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/editpizza", async (req, res) => {
    const editedpizza = req.body.editedpizza

    try {
        var pizza = await Pizza.findOne({ _id: editedpizza._id })
        if (pizza) {
            pizza.name = editedpizza.name,
                pizza.description = editedpizza.description,
                pizza.image = editedpizza.image,
                pizza.category = editedpizza.category,
                pizza.prices = [editedpizza.prices],
                pizza.choice = editedpizza.choice

            await pizza.save();
        }

        var pizza = await nonvegPizza.findOne({ _id: editedpizza._id })
        if (pizza) {
            pizza.name = editedpizza.name,
                pizza.description = editedpizza.description,
                pizza.image = editedpizza.image,
                pizza.category = editedpizza.category,
                pizza.prices = [editedpizza.prices],
                pizza.choice = editedpizza.choice

            await pizza.save();
        }

        var pizza = await vegPizza.findOne({ _id: editedpizza._id })
        if (pizza) {
            pizza.name = editedpizza.name,
                pizza.description = editedpizza.description,
                pizza.image = editedpizza.image,
                pizza.category = editedpizza.category,
                pizza.prices = [editedpizza.prices]


            await pizza.save();
        }
        var pizza = await fruitPizza.findOne({ _id: editedpizza._id })
        if (pizza) {
            pizza.name = editedpizza.name,
                pizza.description = editedpizza.description,
                pizza.image = editedpizza.image,
                pizza.category = editedpizza.category,
                pizza.prices = [editedpizza.prices]

            await pizza.save();
        }
        var pizza = await parathaPizza.findOne({ _id: editedpizza._id })
        if (pizza) {
            pizza.name = editedpizza.name,
                pizza.description = editedpizza.description,
                pizza.image = editedpizza.image,
                pizza.category = editedpizza.category,
                pizza.prices = [editedpizza.prices]

            await pizza.save();
        }
        var pizza = await paneerPizza.findOne({ _id: editedpizza._id })
        if (pizza) {
            pizza.name = editedpizza.name,
                pizza.description = editedpizza.description,
                pizza.image = editedpizza.image,
                pizza.category = editedpizza.category,
                pizza.prices = [editedpizza.prices]

            await pizza.save();
        }
        var pizza = await mushroomPizza.findOne({ _id: editedpizza._id })
        if(pizza){
            pizza.name = editedpizza.name,
            pizza.description = editedpizza.description,
            pizza.image = editedpizza.image,
            pizza.category = editedpizza.category,
            pizza.prices = [editedpizza.prices]

            await pizza.save();}
        res.send("Pizza Details edited successfully")
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/deletepizza", async (req, res) => {
    const pizzaId = req.body.pizzaid;

    try {
        const collections = [Pizza, nonvegPizza, vegPizza, fruitPizza, parathaPizza, paneerPizza, mushroomPizza];

        const results = await Promise.all(collections.map(collection => collection.findOneAndDelete({ _id: pizzaId })));

        if (results.some(pizza => pizza)) {
            return res.send("Pizza deleted successfully");
        }

        return res.status(404).json({ message: "Pizza not found" });
    } catch (error) {
        console.error("Error deleting pizza:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
