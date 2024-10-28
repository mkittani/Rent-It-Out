// app.js
const express = require('express');
const mysql = require('mysql2/promise');
const verificationRoutes = require('./routes/verification');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(express.json());

// MySQL Database Connection Setup
const dbConfig = {
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name'
};

async function initializeDbConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('MySQL connected');
    // Store the connection globally for easy access in other modules
    global.db = connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
}

initializeDbConnection();

// Routes
app.use('/api', verificationRoutes);
app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
