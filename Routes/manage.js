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
                    let moneyAllocated = 0;
                    for (goal of goals) {
                        moneyAllocated += goal.progress;
                    }

                    const errorMessage = req.session.errorMessage;
                    req.session.errorMessage = null;
                    const confirmation = req.session.confirmation;
                    req.session.confirmation = null;

                    res.render('manage', {pagetitle: "Firefly Budgeting: Goals",
                                          loggedIn: true,
                                          wallet: (record[0].moneyEarned - record[0].moneySpent - moneyAllocated).toFixed(2),
                                          goals: goals,
                                          hasGoals: goals.length > 0,
                                          errorMessage: errorMessage,
                                          confirmation: confirmation})
                }
            })
        } else {
            res.redirect('/login')
        }
    })    
})

router.post('/', function(req, res) {

    let allocatedSum = 0;

    const values = Object.values(req.body) 
    for (value of values) {
        allocatedSum += Number(value);
    }
    User.find({username: req.session.username}, function(err, record) {
        if (err) {console.log(err);}
        else {
            let wallet = record[0].moneyEarned - record[0].moneySpent;
            if (allocatedSum > wallet) {
                req.session.errorMessage = "You don't have enough savings!";
                res.redirect('/manage');
            } else {

                // Update progress in database    
                Goal.find({username: req.session.username}, (err, goals) => {
                    if (err) {console.log(err)}
                    else {
                        for (goal of goals) {
                            goal.progress = Number(req.body[goal.goalID]);
                            let progress = Number(goal.progress);
                            let total = Number(goal.goalPrice);

                            let milestone = Math.ceil((progress * 100/total) / 5) * 5

                            goal.progressMilestone = milestone;


                            goal.save((err) => {
                                if (err) {console.log(err)}
                            })
                        }
                        req.session.confirmation = "Savings recorded!";
                        res.redirect("/manage");
                    }
                    

                })


                
            }
        }
    })
    
})

module.exports = router;