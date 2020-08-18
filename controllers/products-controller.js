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

// const updateProduct =(req,res,next) =>{
//     const{ name, img, description, price, quantity } = req.body;
//     const productId = req.params.pid;
//     const updatedProduct = {...DUMMY_PRODUCTS.find(p => p.id === productId)};
//     const productIndex = DUMMY_PRODUCTS.findIndex(p => p.id === productId);
//     updatedProduct.name = name;
//     updatedProduct.description=description;
//     updatedProduct.img =img;
//     updatedProduct.price=price;
//     updatedProduct.quantity=quantity;
//     DUMMY_PRODUCTS[productIndex]=updatedProduct;

//     res.status(200).json({product:updatedProduct})

// }

// const deleteProduct =(req,res,next) =>{
//     const productId = req.params.pid;
//     if(!DUMMY_PRODUCTS.find(p => p.id === productId)){
//         throw new HttpError('Could not find a product for that id',404);
//     }
//     DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter(p => p.id !== productId);
//     res.status(200).json({message:'Deleted the product'});
// }
exports.getProductById = getProductById;
exports.getProducts = getProducts;

exports.createProduct = createProduct;

// exports.deleteProduct = deleteProduct;

// exports.updateProduct = updateProduct;