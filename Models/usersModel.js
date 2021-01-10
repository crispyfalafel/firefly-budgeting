let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let userSchema = new Scheme( {
    username : String,
    password: String,
    moneyEarned: Number,
    moneySpent: Number
});

module.exports = mongooose.model('Users', userSchema);
