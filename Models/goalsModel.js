let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let goalSchema = new Scheme( {
    username : String,
    goalName : String,
    goalID: String,
    goalPrice : Number,
    progress : Number,
    progressMilestone : Number
})

module.exports = mongooose.model('Goals', goalSchema);
