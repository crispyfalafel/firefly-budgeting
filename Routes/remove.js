var express = require('express');
var router = express.Router();
var Goal = require('../Models/goalsModel');
var User = require('../Models/usersModel');


router.post('/', function(req, res) {
    let goalID = req.body.remove;

    Goal.deleteOne({username: req.session.username, goalID: goalID}, function(err) {
        if (err) {console.log(err);}
        else {
            req.session.removedMessage = "Goal successfully removed."
            res.redirect("/profile");

        }
    })

})




module.exports = router;