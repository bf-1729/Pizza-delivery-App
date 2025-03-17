const express = require("express")
const connectDB = require("./db")
const pizzasRoute = require("./routes/pizzaRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/ordersRoute")
const cors = require("cors")
connectDB()
const app = express()
app.use(express.json({ limit: '10mb' })); // Increase JSON size limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded data limit

app.use(
    cors({
      origin: "https://pizzahut-frontend-site.vercel.app", // Your frontend URL
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
  
app.use("/api/pizzas/",pizzasRoute)
app.use("/api/users/",userRoute)
app.use("/api/orders/",orderRoute)



app.get("/",(req,res)=>{
    res.send("Server Working")
});

app.listen(4000,()=>console.log("server is running"))