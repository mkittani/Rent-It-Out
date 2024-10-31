const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationStatus: {
    type: DataTypes.ENUM('Pending', 'Verified', 'Failed'),
    defaultValue: 'Pending'
  }
});

module.exports = User;
