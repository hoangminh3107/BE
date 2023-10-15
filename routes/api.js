var express = require('express');
var router = express.Router();
var apiU = require('../controllers/user.controllers');
var apiOder = require('../controllers/orderControllers')


router.get('/users', apiU.listUser);
router.post('/users/register', apiU.register);
router.post('/users/login', apiU.login);


// đơn hàng
router.get('/order', apiOder.getOrders);
router.post('/add/order', apiOder.createOrder);

module.exports = router;