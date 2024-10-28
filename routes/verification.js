const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/verify', async (req, res) => {
  try {
    const { userId } = req.body;
    const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    //  user  status = Pending
    await db.execute('UPDATE users SET verificationStatus = ? WHERE id = ?', ['Pending', userId]);
    return res.status(200).json({ message: 'Verification request submitted', user: user[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//check user verification status 
router.get('/verify/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [user] = await db.execute('SELECT verificationStatus FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ verificationStatus: user[0].verificationStatus });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
