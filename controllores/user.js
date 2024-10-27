const User = require('../models/userModel');
const bcrypt = require('');
const jwt = require('j');

// Secret for JWT
const JWT_SECRET = 'your_jwt_secret_key';

const userController = {
    // Register a new user
    register: (req, res) => {
        const { username, email, password } = req.body;

        // Check if the user exists
        User.findByEmail(email, (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // If not, register the new user
            User.register({ username, email, password }, (err, result) => {
                if (err) throw err;
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    },

    // Login a user
    login: (req, res) => {
        const { email, password } = req.body;

        // Find user by email
        User.findByEmail(email, (err, results) => {
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user = results[0];

            // Compare password
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
                expiresIn: '1h'
            });

            res.status(200).json({ message: 'Login successful', token });
        });
    }
};

module.exports = userController;
