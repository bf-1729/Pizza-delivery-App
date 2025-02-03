const express = require("express");
const router = express.Router();
const Order = require("../model/orderModel");

// Route to handle order address submission
router.post("/address", async (req, res) => {
  const address = req.body;

  try {
    const newOrder = new Order({
      name: address.name,
      number: address.number,
      AddressLine1: address.AddressLine1,
      AddressLine2: address.AddressLine2,
      landmark: address.landmark,
      pincode: address.pincode,
      isDelivered: address.isDelivered || false, // Ensure default is false
      state: address.state,
      country: address.country,
      cartItems: address.cartItems,
      currentUser: address.currentUser,
      Amount: address.Amount,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order details saved successfully." });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ message: "An error occurred while saving the order." });
  }
});

// Route to get all orders
router.get("/getorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "An error occurred while fetching orders." });
  }
});

// Route to mark an order as delivered
router.put("/deliverOrder/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now(); // Add a timestamp
    await order.save();

    res.status(200).json({ message: "Order marked as delivered", order });
  } catch (error) {
    console.error("Error updating order:", error.message);
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
});

module.exports = router;
