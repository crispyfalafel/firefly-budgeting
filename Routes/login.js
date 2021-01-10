var express = require('express');
var router = express.Router();
var User = require('../Models/usersModel');


router.get('/', function(req, res, next) {
    const loginError = req.session.loginError;
    req.session.loginError = null;
    res.render('login', {pagetitle: 'Firefly Budgeting: Login', error: loginError})
})

router.post('/', function(req, res) {
    req.session.loginError = null;
    const username = req.body.username;
    const password = req.body.password;

    User.find({username: username, password: password}, function(err, records) {
        if(err) {console.log(err)}
        else{
            if (records.length == 1) {
                req.session.username = username;
                res.redirect('/')
            } else {
                req.session.loginError = "Incorrect username and/or password."
                res.redirect('/login')
            }
        }
    })


})
module.exports = router;