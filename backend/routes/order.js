const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ message: 'User ID and items are required' });
        }

        let totalAmount = 0;

        for (const item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ message: `Menu item not found: ${item.menuItemId}` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const newOrder = new Order({ userId, items, totalAmount });
        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const objectId = new mongoose.Types.ObjectId(userId);

        const orders = await Order.find({ userId: objectId })
            .populate({
                path: 'items.menuItemId',
                select: 'name price',
            })
            .sort({ createdAt: -1 }); 

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'username')
            .populate('items.menuItemId', 'name price');

        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching all orders:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (err) {
        console.error('Error deleting order:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/:id/complete', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: 'Completed' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order marked as completed', order: updatedOrder });
    } catch (err) {
        console.error('Error updating order status:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
