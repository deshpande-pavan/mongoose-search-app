const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var session = require('express-session');
const path = require('path');
const port = process.env.PORT || 3000;
var passport = require('passport');

mongoose.connect('mongodb://localhost:27017/SearchApp');

var users = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'super duper secret',
    saveUninitialzed: true,
    resave: true
}));

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',users)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});