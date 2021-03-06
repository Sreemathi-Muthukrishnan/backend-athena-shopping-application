const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{ 
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    inventory:{
        type:Number,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    rater:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Product',productSchema);