const uuid = require('uuid');
const mongoose = require('mongoose');
const Order = require('../models/order');
const HttpError = require('../models/http-error');
// const User = require('../models/user');


const getOrdersByUser = async (req,res,next) =>{
    const userId = req.params.uid;
    let orders;
    try{
         orders = await Order.find({user: userId});
    }catch(err){
        const error = new HttpError('Fetching orders failed, please try again later',500);
        return next(error);
    }
    
    if(!orders){
       return next(new HttpError('Could not find orders for the provided id',404));
    }
    // if(!userWithOrders || userWithOrders.orders.length === 0){
    //     return next(new HttpError('Could not find orders for provided user',404));
    // }
    res.json({orders: orders.map(order => order.toObject({getters:true}))});
}

const createOrder = async (req,res,next) =>{
    const{ orderData , price , products, user } = req.body;
    const createdOrder = new Order({
       orderData :{
           name:orderData.name,
           address:orderData.address,
           pinCode:orderData.pinCode,
           country:orderData.country,
           email:orderData.email,
           paymentMethod:orderData.paymentMethod 
       },
       price,
       products,
       user
    });
    try{
        await createdOrder.save();
    }catch(err){
        const error = new HttpError('Creating order failed!,please try again',500);
        return next(error);
    }
    res.status(201).json({order: createdOrder});
}

const deleteOrder = async (req,res,next) =>{
   const orderId = req.params.oid;
   let order;
   try{
       order = await Order.findById(orderId);
   }catch(err){
    const error = new HttpError('Something went wrong could not delete order!',500);
    return next(error);
   }
   try{
       await order.remove();
   }catch(err){
    const error = new HttpError('Something went wrong could not delete order!',500);
    return next(error);
   }
    res.status(200).json({message:'Deleted order!'});
}




exports.getOrdersByUser = getOrdersByUser;

exports.createOrder = createOrder;
 
exports.deleteOrder = deleteOrder;