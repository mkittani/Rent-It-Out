const db = require('../config/db');

async function createReview(renterId, itemId, rating, comment) {
  const [result] = await db.execute(
    'INSERT INTO reviews (renterId, itemId, rating, comment) VALUES (?, ?, ?, ?)',
    [renterId, itemId, rating, comment]
  );
  return result;
}

async function getReviewsByItemId(itemId) {
  const [rows] = await db.execute(
    'SELECT * FROM reviews WHERE itemId = ?',
    [itemId]
  );
  return rows;
}

async function updateReview(id, rating, comment) {
  const [result] = await db.execute(
    'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
    [rating, comment, id]
  );
  return result;
}

async function deleteReview(id) {
  const [result] = await db.execute(
    'DELETE FROM reviews WHERE id = ?',
    [id]
  );
  return result;
}

module.exports = {
  createReview,
  getReviewsByItemId,
  updateReview,
  deleteReview
};
