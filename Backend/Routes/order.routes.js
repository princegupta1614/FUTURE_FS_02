import express from "express";
import { Order } from "../Models/Order.models.js";
import { Cart } from "../Models/Cart.models.js";
import isLoggedIn from "../Middleware/authMiddleware.js";

const router = express.Router();

// Place order
router.post("/place", isLoggedIn, async (req, res) => {
    try {
        const userId = req.session.userId;

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

        const order = new Order({
            userId,
            items: cart.items,
            totalPrice,
            status: "Placed"
        });
        await order.save();

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Order placed successfully", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get user's orders
router.get("/myorders", isLoggedIn, async (req, res) => {
    try {
        const userId = req.session.userId;
        const orders = await Order.find({ userId })
            .sort({ placedAt: -1 })
            .populate("items.productId");
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
