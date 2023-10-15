var express = require('express');
var router = express.Router();
var apiU = require('../controllers/user.controllers');


router.get('/users', apiU.listUser);
router.post('/users/register', apiU.register);
router.post('/users/login', apiU.login);

module.exports = router;