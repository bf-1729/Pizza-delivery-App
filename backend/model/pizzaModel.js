const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
    name: String,
    varients: [],
    prices: [],
    image: String,
    category: String,
    description: String,
    page: String
}, {
    timestamps: true
});

// ✅ Use only these index definitions
pizzaSchema.index({ name: 1 });
pizzaSchema.index({ category: 1 });
pizzaSchema.index({ page: 1 });

module.exports = mongoose.model("pizza", pizzaSchema);
