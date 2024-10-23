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

// Add product
router.post('/', authenticateToken, (req, res) => {
    const { name, description, price, quantity, image_url } = req.body;

    if(!name || !price || !quantity || !image_url) {
        return res.status(400).json({ error: 'Required fields missing' });
    }

    const sql = `INSERT INTO products (name, description,price, quantity, image_url) VALUES(?, ?, ?, ?, ?)`;

    db.run(sql, [name, description, price, quantity, image_url], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Server error '});
        }
        res.status(201).json({ id: this.lastID });
    });
});

//Update product 
router.put('/:id', authenticateToken, (req, res) => {
    const { name, description, price, quantity, image_url } = req.body;
    const { id } = req.params;

    const sql = `UPDATE products 
                SET name?, description=?, price=?, quantity=?, image_url=?
                WHERE id=?`;

    db.run(sql, [name, description, price, quantity, image_url, id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Server error'});
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated'})
    });
});



//Delete product
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM products WHERE id=?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error:'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    });
});

module.exports = router;