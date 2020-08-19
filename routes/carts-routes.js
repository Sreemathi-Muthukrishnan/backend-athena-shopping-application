const express = require('express');

const cartsControllers = require("../controllers/carts-controller");

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/:uid',cartsControllers.getCartByUser);



router.post('/',cartsControllers.createCart);



router.delete('/:cid',cartsControllers.deleteCart);

module.exports=router;