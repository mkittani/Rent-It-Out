const express = require('express');
require('dotenv').config();
const db = require('./models');

const app = express();

const environment = process.env.NODE_ENV || 'development';

console.log(`Environment: ${environment}`);

// Import routes
const categoryRoutes = require('./routes/categoryRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categoryRoutes);

// Test API
app.get('/', (req, res) => {
  res.json({ message: 'All goooood!' });
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running in ${environment} on port ${PORT}`);
});
