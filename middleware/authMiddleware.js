const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const cookieParser = require('cookie-parser');

const authMiddleware = async (req, res, next) => {
   
    const token = req.cookies.token;
        // console.log(req);
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;