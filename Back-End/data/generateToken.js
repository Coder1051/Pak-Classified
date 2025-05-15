const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role // Include role directly for easier checks later
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d' // You can adjust as needed
    });

    return token;
};

module.exports = generateToken;
