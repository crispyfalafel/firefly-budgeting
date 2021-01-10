const express = require('express');
const router = express.Router();
let User = require('../Models/usersModel');


router.get('/', function(req, res, next) {
    const registerError = req.session.registerError;
    req.session.registerError = null;
    res.render('register', {pagetitle: 'Register', error: registerError})
    
})

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    
    if (password != confirmPassword) {
        req.session.registerError = "Passwords do not match.";
        res.redirect("/register")
    }
    else {
        User.find({username: username}, function(err, records) {
            if (err) {console.log(err);}
            else {
                if (records.length == 0) {
                    let newUser = new User({username: username, password: password, moneyEarned: 0, moneySpent: 0});
                    
                    newUser.save(function(err) {
                        if(err) {console.log(err);}
                        else {
                            req.session.username = username;

                            res.redirect("/");
                        }
                    })
                } else {
                    req.session.registerError = "Username aleady taken.";
                    res.redirect("/register");
                }
            }
        })
    }    
})
module.exports = router;