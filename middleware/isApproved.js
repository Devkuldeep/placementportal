const User = require('../models/userModel');

const isApproved = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user && user.is_approved) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. User is not approved.Contact The College' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = isApproved;