require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.CON_STR);
}

module.exports = {
    connectDB }

// require("dotenv").config();
// const mongoose = require("mongoose");

// async function connectDB() {

//     await mongoose.connect(process.env.CON_STR);
// }


// module.exports = {
//     connectDB
// }