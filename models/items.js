//const db = require('../config/dbConfig');

const Item = {
    // Get all items
    getAllItems: (callback) => {
        const query = 'SELECT * FROM items';
        db.query(query, callback);
    },

    // Add a new item listing
    addItem: (itemData, callback) => {
        const query = 'INSERT INTO items (name, description, category, price, location, user_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [itemData.name, itemData.description, itemData.category, itemData.price, itemData.location, itemData.user_id], callback);
    },

    // Get an item by ID
    getItemById: (id, callback) => {
        const query = 'SELECT * FROM items WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Item;
