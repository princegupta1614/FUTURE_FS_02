import express from "express";
import bcrypt from "bcrypt";
import { Admin } from "../Models/admin.models.js";

const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Store admin ID in session
        req.session.adminId = admin._id;

        res.json({ message: "Admin login successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin Logout
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.clearCookie("connect.sid");
        res.json({ message: "Admin logged out" });
    });
});

export default router;
