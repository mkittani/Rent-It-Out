const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/reviews', reviewController.createReview);
router.get('/reviews/:itemId', reviewController.getReviewsByItemId);
router.put('/reviews/:reviewId', reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;
