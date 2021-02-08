let express = require('express');
let expressSession = require('express-session');
let expressValidator = require('express-validator');
let bodyParser = require('body-parser');
let consign = require('consign');
let mongodb = require('mongodb');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(expressSession({
    secret: 'aetwrwrtrggsh',
    resave: false,
    saveUninitialized: false
}));

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .then('config/dbConnection.js')
    .into(app);

module.exports = app;    
