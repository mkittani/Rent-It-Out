// server.js
const express = require('express');
require('dotenv').config();
const db = require('./models');
const securityRouter = require('./routes/securityRouter');

const app = express();

const environment = process.env.NODE_ENV || 'development';

const errorHandler = require('./middleware/errorHandler');

const categoryRoutes = require('./routes/categoryRouter');
const userRoutes = require('./routes/userRouter');
const itemRoutes = require('./routes/itemRouter');
const transactionRoutes = require('./routes/transactionRouter');
const securityRoutes = require('./routes/securityRouter'); // Add security deposit routes
const reviewRoutes = require('./routes/reviewRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/security-deposits', securityRouter);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'All good!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running in ${environment} on port ${PORT}`);
});
