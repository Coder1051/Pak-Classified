const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const User = require("../models/user");
dotenv.config();

async function Authentication(req, res, next) {
    try {
        const token = req.header(process.env.JWT_TOKEN_HEADER);
        console.log("Received Token from Header:", token);        
        if (!token) {
            return res.status(401).json({ message: "Token not provided", status: 401 });
        }
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (tokenData) {
            req.User = {
                _id: tokenData._id,
                name: tokenData.name,
                email: tokenData.email, // better than 'password'
                role: tokenData.role
            };
            return next();
        }
    } catch (err) {
        console.error("JWT Error:", err.name);
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Authentication Failed', status: 401 });
        }
        return res.status(500).json({ message: `Server error`, status: 500 });
    }
}

async function isAdmin(req, res, next) {
    const currentUser = req.User;
    if (currentUser.role === "Admin") {
        return next();
    }
    return res.status(401).json({ message: 'You are not Authorized to Login as Admin Role ', status: 401 });
}

module.exports = {
    Authentication, isAdmin
}