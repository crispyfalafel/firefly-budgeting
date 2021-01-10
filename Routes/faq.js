var express = require('express');
var router = express.Router();
var Goal = require('../Models/goalsModel');
var User = require('../Models/usersModel');

router.get('/', function(req, res) {
    res.render("faq", {pagetitle: "Firefly Budgeting: FAQ"}) 
})


module.exports = router;