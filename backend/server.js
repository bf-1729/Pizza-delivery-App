const express = require("express");
const connectDB = require("./db");
const pizzasRoute = require("./routes/pizzaRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/ordersRoute");
const cors = require("cors");

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

// Define Routes
app.use("/api/pizzas", pizzasRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is Working");
});

// ❌ REMOVE app.listen() for Vercel deployment
// app.listen(4000, () => console.log("server is running"));

// ✅ EXPORT THE APP instead
module.exports = app;
