const isCompany = (req, res, next) => {
    if (req.user && req.user.role === 'company') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Only companies are allowed.' });
    }
};

module.exports = isCompany;