const express = require("express");
const connectDB = require("./db");
const pizzasRoute = require("./routes/pizzaRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/ordersRoute");
const cors = require("cors");

connectDB();

const app = express();
app.use(express.json({ limit: '10mb' })); // Increase JSON size limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded data limit

// Proper CORS Configuration
app.use(cors({
    origin: "https://pizza-delivery-app-nu.vercel.app", // Allow only your frontend
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

app.use("/api/pizzas/", pizzasRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", orderRoute);

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.listen(4000, () => console.log("Server is running on port 4000"));
