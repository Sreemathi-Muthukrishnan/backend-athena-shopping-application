const express = require('express');

const productsControllers = require("../controllers/products-controller");

const router = express.Router();

router.get('/',productsControllers.getProducts);

router.get('/:pid',productsControllers.getProductById);

router.post('/',productsControllers.createProduct);

module.exports=router;