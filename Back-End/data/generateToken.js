// const jwt = require("jsonwebtoken");

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
//     expiresIn: '30d',

//   });
//   console.log(token)
//   res.cookie('jwt', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     // maxAge: 30 * 24 * 60 * 60 * 1000,
//     maxAge: 10 * 1000,// 10 seconds
//   });
// };

// module.exports = generateToken;

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
