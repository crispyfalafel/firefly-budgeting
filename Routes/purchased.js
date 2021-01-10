var express = require('express');
var router = express.Router();
var Goal = require('../Models/goalsModel');
var User = require('../Models/usersModel');


router.post('/', function(req, res) {
    let goalID = req.body.purchaseID;
    let goalPrice = Number(req.body.purchasePrice);

    // Subtract spendings from user money
    User.find({username: req.session.username}, function(err, record) {
        if (err) {console.log(err);}
        else {
            record[0].moneySpent += goalPrice;
            record[0].save((err) => {
                if (err) {console.log(err);}
            })
            Goal.find({username: req.session.username, goalID: goalID}, function(err, item) {
                if (err) {console.log(err);}
                else {
                    item[0].progress = 0;
                    item[0].progressMilestone = 0;

                    item[0].save((err) => {
                        if (err) {console.log(err);}
                        req.session.purchasedMessage = "Item successfully purchased! Spending recorded.";
                        res.redirect("/profile");
                    })
                }
            })
        }
    })
})




module.exports = router;