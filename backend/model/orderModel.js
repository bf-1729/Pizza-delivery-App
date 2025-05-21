const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        cartItems:{type:Object,required:true},
        isDelivered:{type:Object,default:false},
        name: { type: String, required: true },
        number:{ type: String, required: true },
        AddressLine1:{ type: String, required: true },
        AddressLine2:{ type: String, required: true },
        landmark:{ type: String, required: true },
        pincode:{ type: String, required: true },
        state:{ type: String, required: true },
        country:{type:String,required:true},
        currentUser:{type:Object,required:true},
        Amount:{type:String,required:true}
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("order", orderSchema);
