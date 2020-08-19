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
    const{ name, img, description, price, quantity,type } = req.body;
    const createdProduct = new Product({
        name,
        img,
        description,
        price,
        quantity,
        type
    });
    try{
        await createdProduct.save();
    }catch(err){
        const error = new HttpError('Creating Product failed!,please try again',500);
        return next(error);
    }
    
    res.status(201).json({product: createdProduct});
}

exports.getProductById = getProductById;
exports.getProducts = getProducts;

exports.createProduct = createProduct;
