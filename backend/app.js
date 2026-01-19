const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'InTerns API is running...',
        status: 'active'
    });
});

module.exports = app;