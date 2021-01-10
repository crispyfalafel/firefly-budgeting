var express = require('express');
var router = express.Router();
let User = require('../Models/usersModel');

router.get('/', function(req, res, next) {
    const moneyAddConfirm = req.session.moneyAddConfirm;
    req.session.moneyAddConfirm = null;

    const newGoalInfo = req.session.newGoalInfo;
    req.session.newGoalInfo = null;

    res.render('index', {pagetitle: 'Firefly Budgeting', 
                         loggedIn: req.session.username,
                         moneyConfirm: moneyAddConfirm, 
                         newGoalInfo: newGoalInfo});
                         
});

router.post('/', function(req, res, next) {
    const moneyAdd = Number(req.body.money_earned);
    const moneyRemove = Number(req.body.money_spent);
    
    User.find({username: req.session.username}, function(err, records) {
        if (err) {console.log(err);}
        else if (records.length == 1) {
            let updatedMoney = Number(records[0].wallet) + moneyAdd - moneyRemove;
            records[0].moneyEarned += moneyAdd;
            records[0].moneySpent += moneyRemove;
            records[0].save(function(err) {
                if (err) {console.log(err)}
                else {
                    req.session.moneyAddConfirm = `You have $${(records[0].moneyEarned - records[0].moneySpent).toFixed(2)} saved!`
                    res.redirect("/")
                }
            })
        } else {
            res.redirect("/")
        }
    })

    
    
    // User.find({username: req.session.username}, function(err, records) {
    //     if (err) {console.log(err);}
    //     else if (records.length == 1) {
    //         let updatedUser = 
    //     } else {
    //         res.redirect("/")
    //     }
    // })
    
})
module.exports = router;