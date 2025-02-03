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
        const pizzas = await Pizza.find({})
        res.send(pizzas)
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallnonvegpizzas", async (req, res) => {
    try {
        const pizza = await nonvegPizza.find({})
        res.send(pizza)
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallvegpizzas", async (req, res) => {
    try {
        const pizza = await vegPizza.find({})
        res.send(pizza)
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallfruitpizzas", async (req, res) => {
    try {
        const pizza = await fruitPizza.find({})
        res.send(pizza)
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallparathapizzas", async (req, res) => {
    try {
        const pizza = await parathaPizza.find({})
        res.send(pizza)
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallpaneerpizzas", async (req, res) => {
    try {
        const pizza = await paneerPizza.find({})
        res.send(pizza)
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/getallmushroompizzas", async (req, res) => {
    try {
        const pizza = await mushroomPizza.find({})
        res.send(pizza)
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
        var pizza = await Pizza.findOne({ _id: pizzaId });
        if (pizza) {
            return res.send(pizza);
        }

        var pizza = await vegPizza.findOne({ _id: pizzaId });
        if (pizza) {
            return res.send(pizza);
        }

        var pizza = await nonvegPizza.findOne({ _id: pizzaId });
        if (pizza) {
            return res.send(pizza);
        }
        var pizza = await fruitPizza.findOne({ _id: pizzaId });
        if (pizza) {
            return res.send(pizza);
        }
        var pizza = await parathaPizza.findOne({ _id: pizzaId });
        if (pizza) {
            return res.send(pizza);
        }
        var pizza = await paneerPizza.findOne({ _id: pizzaId });
        if (pizza) {
            return res.send(pizza);
        }
        var pizza = await mushroomPizza.findOne({ _id: pizzaId });
        if (pizza) {
            return res.send(pizza);
        }

        return res.status(404).json({ message: "Pizza not found" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
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
                pizza.prices = [editedpizza.prices]

            await pizza.save();
        }

        var pizza = await nonvegPizza.findOne({ _id: editedpizza._id })
        if (pizza) {
            pizza.name = editedpizza.name,
                pizza.description = editedpizza.description,
                pizza.image = editedpizza.image,
                pizza.category = editedpizza.category,
                pizza.prices = [editedpizza.prices]

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
      // Try deleting from Pizza collection first
      let pizza = await Pizza.findOneAndDelete({ _id: pizzaId });
  
      if (pizza) {
        return res.send("Pizza deleted successfully");
      }
  
      // If not found in Pizza, try deleting from vegPizza
      pizza = await nonvegPizza.findOneAndDelete({ _id: pizzaId });
  
      if (pizza) {
        return res.send("Pizza deleted successfully");
      }

      pizza = await vegPizza.findOneAndDelete({ _id: pizzaId });
  
      if (pizza) {
        return res.send("Pizza deleted successfully");
      }

      pizza = await fruitPizza.findOneAndDelete({ _id: pizzaId });
  
      if (pizza) {
        return res.send("Pizza deleted successfully");
      }
      pizza = await parathaPizza.findOneAndDelete({ _id: pizzaId });
  
      if (pizza) {
        return res.send("Pizza deleted successfully");
      }
      pizza = await paneerPizza.findOneAndDelete({ _id: pizzaId });
  
      if (pizza) {
        return res.send("Pizza deleted successfully");
      }
      pizza = await mushroomPizza.findOneAndDelete({ _id: pizzaId });
  
      if (pizza) {
        return res.send("Pizza deleted successfully");
      }
  
      // If not found in either collection, return 404
      return res.status(404).json({ message: "Pizza not found" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
