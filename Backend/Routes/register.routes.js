import express from 'express';
import bcrypt from 'bcrypt';
import {User} from '../Models/User.models.js';

const router = express.Router();

// POST /user - Register a new user
router.post('/user', async (req, res) => {
    try {
        const { fullName, email, password, age, address, phone } = req.body;

        if(age) parseInt(age)


        // Basic validation
        if (!fullName || !email || !password || !address) {
            return res.status(400).json({ message: 'All fields are required...' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            age,
            address,
            phone,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;