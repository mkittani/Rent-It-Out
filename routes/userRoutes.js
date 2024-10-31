const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/verify', userController.submitVerification);
router.get('/verify/status/:userId', userController.checkVerificationStatus);

module.exports = router;
