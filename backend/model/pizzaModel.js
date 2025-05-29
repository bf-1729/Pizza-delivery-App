const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    varients: {
      type: [String],
      required: true,
      default: ["small", "medium", "large"], // example default variants
    },
    prices: {
      type: [
        {
          small: Number,
          medium: Number,
          large: Number,
        },
      ],
      required: true,
    },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["veg", "nonveg", "vegan"], // adjust as per your categories
    },
    description: { type: String, required: true, trim: true },
    page: { type: String, index: true, default: "Homescreen" }, // indexed for faster queries
  },
  {
    timestamps: true,
  }
);

// Create index on page for efficient filtering
pizzaSchema.index({ page: 1 });

module.exports = mongoose.model("Pizza", pizzaSchema);
