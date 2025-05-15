const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = {
    authenticate: async (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1]; // Expect: Bearer <token>

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded; // Add user info to request
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid or Expired Token" });
        }
    },

    authorize: (...allowedRoles) => {
        return async (req, res, next) => {
            try {
                const user = await User.findById(req.user._id).populate("role");

                if (!user || !allowedRoles.includes(user.role.name)) {
                    return res.status(403).json({ message: "Forbidden: Insufficient Permissions" });
                }

                next();
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Server Error" });
            }
        };
    }
};

module.exports = authMiddleware;
