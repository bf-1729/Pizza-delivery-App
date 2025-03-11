const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "https://pizza-delivery-app-xc8b.vercel.app", // Change this to your frontend domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  })
);

app.use(express.json());

// Sample API Route
app.get("/api/pizzas/getallpizzas", (req, res) => {
  res.json({ message: "CORS is enabled, and the API is working!" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
