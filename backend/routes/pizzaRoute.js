const express = require("express");
const router = express.Router();
const Pizza = require("../model/pizzaModel");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

router.get("/getallpizzas", async (req, res) => {
  console.log("GET /getallpizzas called");

  try {
    // Optionally project only needed fields
    const pizzas = await Pizza.find({}, {
      name: 1,
      prices: 1,
      image: 1,
      varients: 1,
      category: 1,
      page: 1,
    }).lean();

    res.status(200).json({ success: true, count: pizzas.length, data: pizzas });
  } catch (error) {
    console.error("Error in /getallpizzas:", error);
    res.status(500).json({ success: false, message: "Failed to fetch pizzas", error: error.message });
  }
});

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
            prices: pizza.prices,
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
        const pizza = await Pizza.findOne({ _id: pizzaId });

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
            pizza.prices = editedpizza.prices;
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

router.post("/chat", async (req, res) => {
    const { horoscope } = req.body;
    console.log("Received horoscope:", horoscope);
  
    if (!horoscope) {
      return res.status(400).json({ error: "Horoscope is required" });
    }
  
    if (!process.env.OPENROUTER_API_KEY) {
      console.log("API key missing");
      return res.status(500).json({ error: "API key is missing" });
    }
  
    try {
      const prompt = `

Based on the zodiac sign "${horoscope}", suggest a creative and delicious pizza that matches the personality traits, preferences, and vibes of that sign. Explain why this pizza suits the sign by referencing specific characteristics (e.g., boldness, calmness, creativity, etc.) in a friendly, imaginative tone. Keep the explanation short (2-4 sentences), fun, and insightful.
`;

  
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-4o",
          max_tokens: 40,
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 40000, // 15 seconds
        }
      );
      
  
      const reply = response.data?.choices?.[0]?.message?.content;
  
      if (!reply) {
        console.log("No reply found in the response");
        return res.status(500).json({ error: "Unexpected response format" });
      }
  
      res.json({ reply });
    } catch (error) {
      console.error("Error with OpenRouter:", error);

    }
  });

module.exports = router;