const db = require('../config/db');

async function createUser(username, email, isVerified = false, verificationStatus = 'Pending') {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, isVerified, verificationStatus) VALUES (?, ?, ?, ?)',
    [username, email, isVerified, verificationStatus]
  );
  return result;
}

async function getUserById(id) {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
}

async function updateUser(id, updates) {
  const fields = [];
  const values = [];
  
  if (updates.username) {
    fields.push('username = ?');
    values.push(updates.username);
  }
  if (updates.email) {
    fields.push('email = ?');
    values.push(updates.email);
  }
  if (updates.isVerified !== undefined) {
    fields.push('isVerified = ?');
    values.push(updates.isVerified);
  }
  if (updates.verificationStatus) {
    fields.push('verificationStatus = ?');
    values.push(updates.verificationStatus);
  }
  
  values.push(id);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  const [result] = await db.execute(sql, values);
  return result;
}

async function deleteUser(id) {
  const [result] = await db.execute(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result;
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
