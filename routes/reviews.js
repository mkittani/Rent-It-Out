const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/reviews', async (req, res) => {
  try {
    const { renterId, itemId, rating, comment } = req.body;

    const [item] = await db.execute('SELECT * FROM items WHERE id = ?', [itemId]);
    if (item.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const [result] = await db.execute(
      'INSERT INTO reviews (renterId, itemId, rating, comment, createdAt) VALUES (?, ?, ?, ?, NOW())',
      [renterId, itemId, rating, comment]
    );

    return res.status(201).json({
      message: 'Review submitted successfully',
      review: { id: result.insertId, renterId, itemId, rating, comment }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /reviews/:itemId: Get all reviews for a specific item
router.get('/reviews/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const [reviews] = await db.execute('SELECT * FROM reviews WHERE itemId = ?', [itemId]);

    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /reviews/:reviewId: Update a review
router.put('/reviews/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // review exists or not
    const [review] = await db.execute('SELECT * FROM reviews WHERE id = ?', [reviewId]);
    if (review.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const [result] = await db.execute(
      'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
      [rating || review[0].rating, comment || review[0].comment, reviewId]
    );

    return res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
