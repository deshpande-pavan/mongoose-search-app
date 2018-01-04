var express = require('express');
var router = express.Router();
// var User = require('../models/User.model');
var controller = require('../controllers/user.controller');

router.post('/register',controller.register);

router.post('/login',controller.login);


module.exports = router;