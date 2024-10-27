const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

// Route to get all items
router.get('/items', itemController.getAllItems);

// Route to add a new item
router.post('/items', itemController.addItem);

// Route to get a single item by ID
router.get('/items/:id', itemController.getItemById);

module.exports = router;
