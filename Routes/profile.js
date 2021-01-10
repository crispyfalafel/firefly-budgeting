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
                        moneyEarned: record[0].moneyEarned.toFixed(2),
                        moneySpent: record[0].moneySpent.toFixed(2),
                        moneySaved: (record[0].moneyEarned - record[0].moneySpent).toFixed(2)
                    }
                    const removedMessage = req.session.removedMessage;
                    req.session.removedMessage = null;
                    const purchasedMessage = req.session.purchasedMessage;
                    req.session.purchasedMessage = null;

                    res.render('profile', {pagetitle: "Firefly Budgeting: Profile",
                                          loggedIn: true,
                                          moneyValues: moneyValues,
                                          goals: goals,
                                          removedMessage: removedMessage,
                                          purchasedMessage: purchasedMessage
                                          })
                }
            })
        } else {
            res.redirect('/login')
        }
    })    
})

module.exports = router;