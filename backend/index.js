const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to GrubSpot API!');
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Database connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
