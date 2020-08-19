const uuid = require('uuid');
const mongoose = require('mongoose');
const Cart = require('../models/cart');
const HttpError = require('../models/http-error');
// const User = require('../models/user');


const getCartByUser = async (req,res,next) =>{
    const userId = req.params.uid;
    let cart;
    try{
         cart = await Cart.find({user: userId});
    }catch(err){
        const error = new HttpError('Fetching cart failed,please try again later!',500);
        return next(error);
    }
    
    if(!cart){
       return next(new HttpError('Could not find a cart for the provided id',404));
    }
    res.json({cart: cart.map(product => product.toObject({ getters : true }))});
    
}

const createCart = async (req,res,next) =>{
    const{  product, user } = req.body;
    const createdCart = new Cart({
       product :{
           name:product.name,
           description:product.description,
           img:product.img,
           quantity:product.quantity,
           price:product.price,
           type:product.type
       },  
       user
    });
    try{
        await createdCart.save();
    }catch(err){
        const error = new HttpError('Creating Cart failed!,please try again',500);
        return next(error);
    }
    res.status(201).json({cart: createdCart});
}

const deleteCart = async (req,res,next) =>{
   const cartId = req.params.cid;
   let cart;
   try{
       cart = await Cart.findById(cartId);
   }catch(err){
    const error = new HttpError('Something went wrong could not delete cart!',500);
    return next(error);
   }
   try{
       await cart.remove();
   }catch(err){
    const error = new HttpError('Something went wrong could not delete cart!',500);
    return next(error);
   }
    res.status(200).json({message:'Deleted cart!'});
}




exports.getCartByUser = getCartByUser;

exports.createCart = createCart;
 
exports.deleteCart = deleteCart;