const isAdminLoggedIn = (req, res, next) => {
    if (req.session && req.session.adminId) {
        return next();
    } else {
        return res.status(401).json({ message: "Unauthorized: Admin login required" });
    }
};

export default isAdminLoggedIn;
