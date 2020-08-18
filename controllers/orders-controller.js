const uuid = require('uuid');
const mongoose = require('mongoose');
const Order = require('../models/order');
const HttpError = require('../models/http-error');
const User = require('../models/user');


const getOrdersByUser = async (req,res,next) =>{
    const userId = req.params.uid;
    let userWithOrders;
    try{
        userWithOrders = await User.findById(userId).populate('orders');
    }catch(err){
        const error = new HttpError('Fetching orders failed, please try again later',500);
        return next(error);
    }
    // if(!userWithOrders || userWithOrders.orders.length === 0){
    //     return next(new HttpError('Could not find orders for provided user',404));
    // }
    res.json({orders: userWithOrders.orders.map(order => order.toObject({getters:true}))});
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
    let userI;
    try{
        userI = await User.findById(user)
    }
    catch(err){
        const error = new HttpError('Creating order failed, please try again later',500);
        return next(error);
    }

    if(!userI){
        const error = new HttpError('Could not find user for provided id',404);
        return next(error);
    }

    console.log(userI);
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdOrder.save({ session: sess});
        userI.orders.push(createdOrder);
        await userI.save({session: sess});
        await sess.commitTransaction();
    }catch(err){
        const error = new HttpError('Creating Order failed!,please try again',500);
        return next(error);
    }
    
    res.status(201).json({order: createdOrder});
}

const deleteOrder = async (req,res,next) =>{
   const orderId = req.params.oid;
   let order;
   try{
       order = await Order.findById(orderId).populate('user');
   }catch(err){
    const error = new HttpError('Something went wrong, could not delete order',500);
    return next(error);
}
    if(!order){
        const error = new HttpError('Something went wrong, could not find order for this id',404);
        return next(error);
    }
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await order.remove({ session : sess});
        order.user.orders.pull(order);
        await order.user.save({session : sess});
        await sess.commitTransaction();
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not delete order',500);
        return next(error);
    }
    res.status(200).json({message:'Deleted order!'});
}




exports.getOrdersByUser = getOrdersByUser;

exports.createOrder = createOrder;
 
exports.deleteOrder = deleteOrder;