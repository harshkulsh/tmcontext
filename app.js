require("dotenv").config();       //used to access .env config
require("./config/database").connect();
const express = require("express");
const bodyparser=require("body-parser");    //used to receive data from html pages  
const DataDome = require('@datadome/node-module');   
const {register,registerView}=require("./controllers/registerController");
const {login,loginView}=require("./controllers/loginController");
const logout=require("./controllers/logoutController");
const auth=require("./middleware/auth");

const app = express(); 
app.set('view-engine', 'ejs')
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(express.json());
const datadomeClient = new DataDome('Some Key', 'api.datadome.co');

//using dataDome for bot protection
app.use(function(req, res, next) {
    datadomeClient.authCallback(req, res, function() {
        next();
    }, function() {
        // nothing to do when blocked
    });
});

app.get("/",registerView);
app.post("/register",register );
app.get('/register',registerView);
app.post("/login",  login);    //using auth middleware to check if the user is logged in
app.get('/login',loginView );
app.post('/logout', logout);

module.exports = app;