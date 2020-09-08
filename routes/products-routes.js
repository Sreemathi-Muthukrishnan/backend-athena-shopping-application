const express = require('express');

const productsControllers = require("../controllers/products-controller");

const router = express.Router();

router.get('/',productsControllers.getProducts);

router.get('/:pid',productsControllers.getProductById);

router.post('/',productsControllers.createProduct);

router.patch('/:pid',productsControllers.updateProduct);

router.patch('/rating/:pid',productsControllers.updateProductRating);

module.exports=router;