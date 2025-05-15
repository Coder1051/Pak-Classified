const {mongoose, SchemaTypes } = require("mongoose")

const roleSchema = new mongoose.Schema({
    Name:{
        type: SchemaTypes.String,
        require:true
    },
    Rank: {
        type: SchemaTypes.String,
        require: true,
        default:"User"
    }    
})
const roles = mongoose.model("roles",roleSchema)
module.exports = roles;
