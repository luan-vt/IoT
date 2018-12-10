var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport')
var indexController = require("../controllers/indexController.js")



/* GET home page. */
router.get('/', isLoggedIn,  function(req, res, next) {
  res.render('index', { view: 'checkin/index', message: req.flash('message')});
});

router.post('/add-rfid', isLoggedIn, indexController.addRfid);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/users/signin');
}