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

db.User = require('./userModel.js')(sequelize, DataTypes);
db.Category = require('./categoryModel.js')(sequelize, DataTypes);
db.Item = require('./itemModel.js')(sequelize, DataTypes);
db.Transaction = require('./transactionModel')(sequelize, DataTypes);
db.SecurityDeposit = require('./securityModel')(sequelize, DataTypes); // Corrected file name

// Define relationships
db.Category.hasMany(db.Item, { foreignKey: 'categoryId', as: 'items' });
db.Item.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

db.User.hasMany(db.Item, { foreignKey: 'ownerId', as: 'itemsOwned' });
db.Item.belongsTo(db.User, { foreignKey: 'ownerId', as: 'owner' });

db.User.hasMany(db.Transaction, { foreignKey: 'renterId', as: 'transactions' });
db.Transaction.belongsTo(db.User, { foreignKey: 'renterId', as: 'renter' });

db.Item.hasMany(db.Transaction, { foreignKey: 'itemId', as: 'transactions' });
db.Transaction.belongsTo(db.Item, { foreignKey: 'itemId', as: 'item' });

// Relationship between Transaction and SecurityDeposit
db.Transaction.hasOne(db.SecurityDeposit, { foreignKey: 'transactionId', as: 'securityDeposit' });
db.SecurityDeposit.belongsTo(db.Transaction, { foreignKey: 'transactionId', as: 'transaction' });

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

module.exports = db;
