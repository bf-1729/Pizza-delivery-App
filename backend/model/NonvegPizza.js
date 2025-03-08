const mongoose = require("mongoose")

const nonvegpizzaSchema = new mongoose.Schema({
    name:String,
    varients:[],
    prices:[],
    image : String,
    category:String,
    description:String,
},{
    timestamps:true
})

module.exports = mongoose.model("nonveg-pizza",nonvegpizzaSchema)