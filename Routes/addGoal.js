var express = require('express');
var router = express.Router();
var Goal = require('../Models/goalsModel');

router.post('/', function(req, res) {
    let goalName = req.body.goalName;
    let goalPrice = Number(req.body.goalCost).toFixed(2);
    let username = req.session.username;
    let goalArray = goalName.split(" ");
    let goalID = goalArray.join("-");

    let newGoal = new Goal({username: username, goalName: goalName, goalID: goalID, goalPrice: goalPrice, progress: 0, progressMilestone: 0});
    console.log(newGoal);
    newGoal.save((err) => {
        if (err) {console.log(err);}
        else {
            console.log("saved")
            req.session.newGoalInfo = `Added ${goalName} ($${goalPrice}) to your list!`;
            res.redirect("/");
        }
    })
})

module.exports = router;