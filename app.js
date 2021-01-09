const express = require('express');
const path = require('path');
const session = require('express-session');

const indexRouter = require('./Routes/index');

// Initialize app
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// app.get('/', (req, res) => {
//     res.send('Hello Worlds')
// })

// Routes
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})