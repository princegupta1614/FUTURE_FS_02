// profile.routes.js
import express from 'express';
import { User } from '../Models/User.models.js';
import isLoggedIn from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userId }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
