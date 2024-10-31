const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview);

router.get('/:itemId', reviewController.getReviewsByItemId);

router.put('/:reviewId', reviewController.updateReview);

router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
