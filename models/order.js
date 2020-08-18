const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderData:{
        name:{ 
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true, 
        },
        pinCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        paymentMethod:{
            type:String,
            required:true
        },
    },
    price:{
        type:Number,
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    user:{type: mongoose.Types.ObjectId , required:true, ref:'User'}
});

module.exports = mongoose.model('Order',orderSchema);