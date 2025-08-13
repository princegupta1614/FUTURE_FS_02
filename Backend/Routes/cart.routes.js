// Routes/cart.routes.js
import express from "express";
import { Cart } from "../Models/Cart.models.js";
import Product from "../Models/Product.models.js";
import isLoggedIn from "../Middleware/authMiddleware.js";

const router = express.Router();

// Get cart items
router.get("/", isLoggedIn, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.session.userId }).populate("items.productId");
        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add to cart
// Add to cart
router.post("/add", isLoggedIn, async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.session.userId });
        const product = await Product.findById(productId); // fetch product price
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (!cart) {
            cart = new Cart({
                userId: req.session.userId,
                items: [{ productId, quantity: 1, totalPrice: product.price }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
                cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * product.price;
            } else {
                cart.items.push({ productId, quantity: 1, totalPrice: product.price });
            }
        }

        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update item quantity
router.put("/update/:productId", isLoggedIn, async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne({ userId: req.session.userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].totalPrice = quantity * product.price;
        cart.updatedAt = Date.now();
        await cart.save();

        res.json({ message: "Quantity updated", cart });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// Remove item
router.delete("/remove/:productId", isLoggedIn, async (req, res) => {
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne({ userId: req.session.userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        cart.updatedAt = Date.now();
        await cart.save();

        res.json({ message: "Item removed", cart });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
