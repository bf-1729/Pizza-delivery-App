const mongoose = require("mongoose")

const paneerpizzaSchema = new mongoose.Schema({
    name:String,
    varients:[],
    prices:[],
    image : String,
    category:String,
    description:String
},{
    timestamps:true
})

module.exports = mongoose.model("paneer-pizza",paneerpizzaSchema)