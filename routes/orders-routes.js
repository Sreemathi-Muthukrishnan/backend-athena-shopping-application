const express = require('express');

const ordersControllers = require("../controllers/orders-controller");

const checkAuth = require('../middleware/check-auth');

const router = express.Router();



router.use(checkAuth);

router.get('/:uid',ordersControllers.getOrdersByUser);



router.post('/',ordersControllers.createOrder);



router.delete('/:oid',ordersControllers.deleteOrder);

module.exports=router;