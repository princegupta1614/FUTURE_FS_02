import express from 'express';
import { User } from '../Models/User.models.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/user', async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        const checkPass = await bcrypt.compare(password, checkUser.password);

        if (!checkPass) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // ✅ Store session data
        req.session.userId = checkUser._id;
        req.session.email = checkUser.email;

        res.status(200).json({ 
            message: 'Login successful',
            user: { id: checkUser._id, email: checkUser.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
