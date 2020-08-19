const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product:{
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
        }
    },
    user:{type: mongoose.Types.ObjectId , required:true, ref:'User'}
});

module.exports = mongoose.model('Cart',cartSchema);