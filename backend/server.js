const express = require("express")
const connectDB = require("./db")
const pizzasRoute = require("./routes/pizzaRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/ordersRoute")
const cors = require("cors")
connectDB()
const app = express()
app.use(express.json({ limit: '4mb' })); // Increase JSON size limit
app.use(express.urlencoded({ limit: '4mb', extended: true })); // Increase URL-encoded data limit

app.use(cors())
app.use("/api/pizzas/",pizzasRoute)
app.use("/api/users/",userRoute)
app.use("/api/orders/",orderRoute)

app.get("/",(req,res)=>{
    res.send("Server Working")
});

app.listen(4000,()=>console.log("server is running"))