const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

// If you want to allow only your frontend:
app.use(
  cors({
    origin: "https://pizza-delivery-app-xc8b.vercel.app", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If using cookies or authentication
  })
);

// Your API route
app.get("/api/pizzas/getallpizzas", (req, res) => {
  res.json({ message: "CORS is now enabled!" });
});
