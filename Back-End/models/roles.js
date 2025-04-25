const { Schema, SchemaTypes, model } = require('mongoose');
const roleSchema = new Schema({
    Rank: {
        type: SchemaTypes.Number
    },
    name: {
        type : SchemaTypes.String   
    }
})
const roles =new model("roles",roleSchema)
module.exports = roles