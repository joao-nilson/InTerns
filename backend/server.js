const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dbManager = require('../database/db');

const app = express();
const PORT = process.env.PORT || 5000;

//connectDB();

app.use(cors()); 
app.use(express.json());

//let users = [];
//let jobs = [];

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Job Board Backend API is running...',
    database: 'MongoDB with Mongoose',
    status: 'connected'
  });
});

process.on('SIGINT', async () => {
  await dbManager.disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
