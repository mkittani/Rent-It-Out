const express = require('express');
require('dotenv').config();
const db = require('./models');

const app = express();

const environment = process.env.NODE_ENV || 'development';

const errorHandler = require('./middleware/errorHandler');

const categoryRoutes = require('./routes/categoryRouter');
const userRoutes = require('./routes/userRouter');
const itemRoutes = require('./routes/itemRouter');
const transactionRoutes = require('./routes/transactionRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'All goooood!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running in ${environment} on port ${PORT}`);
});
