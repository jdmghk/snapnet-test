const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');

//Create order
router.post('/', authenticateToken, (req, res) => {
    const { items, shipping_address } = req.body;
    const user_id = req.user_id;

    if (!items || !items.length || !items.shipping_address) {
        return res.status(400).json({ error: 'Invalid order data' });
    }

    db.serialize(() => [
        
    ])
})

module.exports = router;