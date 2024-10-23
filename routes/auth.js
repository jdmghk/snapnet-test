const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { JWT_SECRET } = require('../middleware/auth');

//Register user
router.post('register', async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;

        //Validation
        if (!email || !password || !firstname || !lastname) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert user
        const sql = 'INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)';
        db.run(sql, [email, hashedPassword, lastname, firstname], function(err) {
            if(err) {
                if (err.message.includes('UNIQUE CONSTRAINT failed')) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Server error' });
            }              
            
            const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET);
            res.status(201).json({ token });
        });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});

//Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: 'Email and password required'});
        }

        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err || !user){
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error'});
    }
});

module.exports = router;