const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/FoodAppDB")
.then(()=>{
    console.log("Mongodb connection successful")
})
.catch(()=>{
    console.log("Mongodb connection failed")
})
