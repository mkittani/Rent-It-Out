const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    // Create a new user
    register: (userData, callback) => {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [userData.username, userData.email, hashedPassword], callback);
    },

    // Find user by email for login
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    }
};

module.exports = User;
