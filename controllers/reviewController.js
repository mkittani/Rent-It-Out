const Review = require('../models/review');

exports.createReview = async (req, res) => {
  try {
    const { renterId, itemId, rating, comment } = req.body;
    const review = await Review.create({ renterId, itemId, rating, comment });
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByItemId = async (req, res) => {
  try {
    const { itemId } = req.params;
    const reviews = await Review.findAll({ where: { itemId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.findByPk(reviewId);

    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);

    if (!review) return res.status(404).json({ message: 'Review not found' });

    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

