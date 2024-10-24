const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models here
db.Category = require('./categoryModel.js')(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

module.exports = db;
