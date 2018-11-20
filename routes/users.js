var userController = require("../controllers/userController.js");
var express = require('express');
var router = express.Router();
var passport = require('passport')


router.get('/signin', userController.signin);

router.post('/signin', passport.authenticate('local-signin',
		{
			successRedirect: '/',
			failureRedirect: '/users/signin'
		}));

router.get('/', function (req, res) {
	res.redirect("/");
})
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/users/signin');
}