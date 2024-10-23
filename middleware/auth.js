const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET;

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Access token required'})
    }
}