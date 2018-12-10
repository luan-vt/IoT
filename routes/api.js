var express = require('express');
var router = express.Router();
var passport = require('passport')
var apiController = require("../controllers/apiController.js")



/* GET home page. */
router.get('/rfid/:id',  apiController.addQueue);


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/users/signin');
}