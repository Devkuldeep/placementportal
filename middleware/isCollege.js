const isCollege = (req, res, next) => {
    const { user } = req;

    if (user && user.role === 'college') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. College role required.' });
    }
};

module.exports = isCollege;