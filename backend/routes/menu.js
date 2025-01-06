const express = require('express');
const multer = require('multer');
const Menu = require('../models/Menu');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, category, price, availability } = req.body;

        if (!name || !category || price === undefined) {
            return res.status(400).json({ message: 'Name, category, and price are required' });
        }

        let imageBase64 = null;
        if (req.file) {
            imageBase64 = req.file.buffer.toString('base64');
        }

        const newMenuItem = new Menu({
            name,
            category,
            price,
            availability,
            image: imageBase64, 
        });

        await newMenuItem.save();

        res.status(201).json({ message: 'Menu item added successfully', item: newMenuItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, availability } = req.body;

        let updates = { name, category, price, availability };

        if (req.file) {
            updates.image = req.file.buffer.toString('base64');
        }

        const updatedMenuItem = await Menu.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item updated successfully', item: updatedMenuItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMenuItem = await Menu.findByIdAndDelete(id);

        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully', item: deletedMenuItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
