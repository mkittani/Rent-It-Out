// routes/securityRouter.js
const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

// Create a new security deposit
router.post('/', securityController.createSecurityDeposit);

// Get all security deposits
router.get('/', securityController.getAllSecurityDeposits);

// Get a security deposit by ID
router.get('/:id', securityController.getSecurityDepositById);

// Update a security deposit by ID
router.put('/:id', securityController.updateSecurityDeposit);

// Delete a security deposit by ID
router.delete('/:id', securityController.deleteSecurityDeposit);

module.exports = router;
