const express = require("express");
const router = express.Router();
const Order = require("../model/orderModel");

// POST: Submit an order with address details
router.post("/address", async (req, res) => {
  const address = req.body;

  // Basic validation
  if (!address.name || !address.number || !address.AddressLine1 || !address.pincode) {
    return res.status(400).json({ message: "Missing required fields in address." });
  }

  try {
    const newOrder = new Order({
      name: address.name,
      number: address.number,
      AddressLine1: address.AddressLine1,
      AddressLine2: address.AddressLine2,
      landmark: address.landmark,
      pincode: address.pincode,
      isDelivered: address.isDelivered || false,
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

// GET: Fetch orders (supports pagination and filter by delivery status)
router.get("/getorders", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const delivered = req.query.delivered;

  const filter = {};
  if (delivered === "true") filter.isDelivered = true;
  if (delivered === "false") filter.isDelivered = false;

  try {
    const totalOrders = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 }) // recent first
      .lean();

    res.status(200).json({
      orders,
      page,
      totalPages: Math.ceil(totalOrders / pageSize),
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "An error occurred while fetching orders." });
  }
});

// PUT: Mark order as delivered
router.put("/deliverOrder/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.isDelivered) {
      return res.status(400).json({ message: "Order already marked as delivered" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({ message: "Order marked as delivered", order });
  } catch (error) {
    console.error("Error updating order:", error.message);
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
});

module.exports = router;
