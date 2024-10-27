const Item = require('../models/itemModel');

const itemController = {
    // Get all items
    getAllItems: (req, res) => {
        Item.getAllItems((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    },

    // Add a new item listing
    addItem: (req, res) => {
        const itemData = req.body;

        Item.addItem(itemData, (err, result) => {
            if (err) throw err;
            res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
        });
    },

    // Get item by ID
    getItemById: (req, res) => {
        const itemId = req.params.id;

        Item.getItemById(itemId, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(result[0]);
        });
    }
};

module.exports = itemController;
