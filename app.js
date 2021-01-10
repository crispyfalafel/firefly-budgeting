const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

var router = express.Router();
const indexRouter = require('./Routes/index');
const loginRouter = require('./Routes/login');
const registerRouter = require('./Routes/register');
const logoutRouter = require('./Routes/logout');
const addGoalRouter = require('./Routes/addGoal');
const manage = require('./Routes/manage');

// Initialize app
const app = express();
const port = 3000;

app.use(express.json());    
app.use(express.urlencoded());

// Initialize session
app.use(session({secret: '3asdfasdfasdfadgafdg'}));

// Connect to database
mongoose.connect('mongodb://localhost:27017/financeDatabase', { useNewUrlParser: true })
let db = mongoose.connection;
db.once('open', () => {
    console.log('database connected');
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/public", express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/addgoal', addGoalRouter);
app.use('/manage', manage)

// Logout



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})