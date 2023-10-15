var express = require('express');
var router = express.Router();
var apiU = require('../controllers/user.controllers');


router.get('/users', apiU.listUser);
router.post('/users/reg', apiU.reg);


module.exports = router;