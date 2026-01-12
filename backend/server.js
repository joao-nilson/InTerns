// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows requests from your React frontend (localhost:3000)
app.use(express.json()); // Parses incoming JSON requests

// In-memory data stores (replace with a database later)
let users = [];
let jobs = [];

// Import route files (we'll create these next)
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Job Board Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
