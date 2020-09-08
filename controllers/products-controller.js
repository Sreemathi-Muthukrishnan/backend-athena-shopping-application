const uuid = require('uuid');

const Product = require('../models/product');
const HttpError = require('../models/http-error');



const getProducts = async (req,res,next)=>{
    let products;
    try{
        products = await Product.find().exec();
    }catch(err){
        const error = new HttpError('Something went wrong,Could not find  products!',500);
        return next(error);
    }
    res.json({products:products.map(product => product.toObject({getters: true}))});
}

const getProductById = async (req,res,next)=>{
    const productId = req.params.pid;
    let product;
    try{
         product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Something went wrong,Could not find a product!',500);
        return next(error);
    }
    
    if(!product){
       return next(new HttpError('Could not find a product for the provided id',404));
    }
    res.json({product: product.toObject({ getters : true })}); //{product} =>{product:product}
};

const createProduct = async (req,res,next) =>{
    const{ name, img, description, price, quantity,type,inventory,rating,rater } = req.body;
    const createdProduct = new Product({
        name,
        img,
        description,
        price,
        quantity,
        type,
        inventory,
        rating,
        rater
    });
    try{
        await createdProduct.save();
    }catch(err){
        const error = new HttpError('Creating Product failed!,please try again',500);
        return next(error);
    }
    
    res.status(201).json({product: createdProduct});
}

const updateProduct = async (req,res,next) =>{
    const { inventory } = req.body;
    const productId = req.params.pid;
    let product;
    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Something went wrong,Could not update product!',500);
        return next(error);
    }
    if(!product){
        return next(new HttpError('Could not find a product for the provided id',404));
     }

    product.inventory = inventory;
    try{
      await product.save();
    }catch(err){
        const error = new HttpError('Something went wrong,Could not update product!',500);
        return next(error);
    }
    res.json({product: product.toObject({ getters : true })});
}
const updateProductRating = async (req,res,next) =>{
    const { rating } = req.body;
    const productId = req.params.pid;
    let product;
    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Something went wrong,Could not update product!',500);
        return next(error);
    }
    if(!product){
        return next(new HttpError('Could not find a product for the provided id',404));
     }
    product.rating = Number(product.rating) * Number(product.rater);
    product.rating = product.rating + Number(rating);
    product.rater  = product.rater + 1;
    product.rating = product.rating / product.rater;
    product.rating = product.rating.toFixed(1);
    try{
      await product.save();
    }catch(err){
        const error = new HttpError('Something went wrong,Could not update product!',500);
        return next(error);
    }
    res.json({product: product.toObject({ getters : true })});
}

exports.getProductById = getProductById;
exports.getProducts = getProducts;

exports.createProduct = createProduct;

exports.updateProduct = updateProduct;

exports.updateProductRating = updateProductRating;
