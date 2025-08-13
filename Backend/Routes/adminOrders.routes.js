import express from "express";
import isAdminLoggedIn from "../Middleware/adminAuthMiddleware.js";
import { Order } from "../Models/Order.models.js";

const router = express.Router();

// Get all orders
router.get("/", isAdminLoggedIn, async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "fullName email");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update order status
router.put("/:id/status", isAdminLoggedIn, async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ["Placed", "Shipped", "Out for delivery", "Delivered"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
