const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'awdasdawdsadawdasdawdasdad';

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password: password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { _id: user._id, username: user.username },
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedOrders = await Order.deleteMany({ userId: id });

        res.status(200).json({
            message: "User and associated orders deleted successfully",
            user: deletedUser,
        });
    } catch (err) {
        console.error("Error during user deletion:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



module.exports = router;
