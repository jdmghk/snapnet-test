const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');


//Get products with search and filtering 
router.get('/', (req, res) => {
    const { search, minPrice, maxPrice } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
        sql += 'AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
        sql += 'AND price >= ?';
        params.push(minPrice);
    }

    if (maxPrice) {
        sql += 'AND price <= ?';
        params.push(maxPrice);
    }

    db.all(sql , params, (err, products) => {
        if(err) {
            return res.status(500).json({ error : 'Server error', err });
        }
        res.json(products);
    });
});

// Add product (admin only)
