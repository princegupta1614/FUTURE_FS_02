// logout.routes.js
import express from 'express';
import isLoggedIn from '../Middleware/authMiddleware.js';
const router = express.Router();

router.post('/', isLoggedIn ,(req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Could not log out' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
});

export default router;
