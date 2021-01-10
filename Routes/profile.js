var express = require('express');
var router = express.Router();
var Goal = require('../Models/goalsModel');
var User = require('../Models/usersModel');

router.get('/', function(req, res) {
    User.find({username: req.session.username}, function(err, record) {
        if (err) {console.log(err);}
        else if (record.length == 1) {
            Goal.find({username: req.session.username}, function(err, goals) {
                if (err) {console.log(err);}
                else {
                    let moneyValues = {
                        moneyEarned: record[0].moneyEarned,
                        moneySpent: record[0].moneySpent,
                        moneySaved: record[0].moneyEarned - record[0].moneySpent
                    }
                    const errorMessage = req.session.errorMessage;
                    req.session.errorMessage = null;
                    const confirmation = req.session.confirmation;
                    req.session.confirmation = null;

                    res.render('profile', {pagetitle: "Profile",
                                          loggedIn: true,
                                          moneyValues: moneyValues,
                                          goals: goals,
                                          hasGoals: goals.length > 0
                                          })
                }
            })
        } else {
            res.redirect('/login')
        }
    })    
})

router.post('/', function(req, res) {

})




module.exports = router;