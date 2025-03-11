const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const pizzasRoute = require("./routes/pizzaRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/ordersRoute");

connectDB();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Apply CORS middleware properly
app.use(cors({
    origin: "https://pizza-delivery-app-nu.vercel.app", // Your frontend domain
    credentials: true, // Important for cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Manually add CORS headers (for double-checking)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://pizza-delivery-app-nu.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// ✅ Define routes after CORS
app.use("/api/pizzas/", pizzasRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", orderRoute);

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.listen(4000, () => console.log("Server is running on port 4000"));
