const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',   // MySQL host
    user: 'root',        // MySQL username
    password: '123',        // MySQL password
    database: 'RentItOut' // Database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
