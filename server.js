const express = require("express")
const db = require("./db")
const pizzasRoute = require("./backend/routes/pizzaRoute")
const userRoute = require("./backend/routes/userRoute")
const orderRoute = require("./backend/routes/ordersRoute")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors("*"))
app.use("/api/pizzas/",pizzasRoute)
app.use("/api/users/",userRoute)
app.use("/api/orders/",orderRoute)



app.get("/",(req,res)=>{
    res.send("Server Working")
});

app.listen(4000,()=>console.log("server is running"))