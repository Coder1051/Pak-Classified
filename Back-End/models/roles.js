const { Schema, model } = require('mongoose');
const roleSchema = new Schema({
    name: {
        type: String,
        maxLenght: 15,
        minLenght: 3
    }
});

const roles = new model("roles", roleSchema)
module.exports = roles