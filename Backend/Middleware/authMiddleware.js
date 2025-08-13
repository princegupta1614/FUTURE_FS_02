// authMiddleware.js

const isLoggedIn = (req, res, next) => {
    if (req.session && req.session.userId) {
        // User is logged in
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized: Please log in first' });
    }
};

export default isLoggedIn