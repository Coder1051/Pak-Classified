const { Schema, SchemaTypes, model } = require('mongoose')
const userSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,      
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Regex for email format
    },
    image: {
        type: SchemaTypes.String,
        required: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    contact: {
        type: SchemaTypes.Number,
        required: true
    },
    role: {
        type: SchemaTypes.ObjectId,
        ref: "roles"
    },
    dateOfbirth: {
        type: SchemaTypes.String,
        required: true
    },
    SecurityAnswer: {
        type: SchemaTypes.String
    },
    securityQuestion: {
        type: SchemaTypes.String
    },
})
const User = new model("User", userSchema)
module.exports = User