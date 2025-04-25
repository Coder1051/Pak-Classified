const { Schema, SchemaTypes, model } = require('mongoose');
const postAd = new Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    Image: {
        type: SchemaTypes.String,
        required: true
    },
    Description: {
        type: SchemaTypes.String,
        required: true
    },
    Features: {
        type: SchemaTypes.String,
        required: true
    },
    Price: {
        type: SchemaTypes.Number,
        required: true
    }, 

    StartOn: {
        type: SchemaTypes.String
    },
    EndOn: {
        type: SchemaTypes.String
    },
    Category: {
        type: SchemaTypes.String,
        required: true
    },
    CityArea: {
        type: SchemaTypes.String,
        required: true
    },
    Type: {
        type: SchemaTypes.String,
        required: true
    },
    User: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    postOwner: {
        type: SchemaTypes.String

    },
    postOwnerContact: {
        type: SchemaTypes.String
    },
    OwnerName:{
        type:SchemaTypes.String
    },
    OwnerContact:{
         type:SchemaTypes.String
    }
});

const PostAd = new model("PostAd", postAd);
module.exports = PostAd 