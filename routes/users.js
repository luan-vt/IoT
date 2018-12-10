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

router.get('/', isLoggedIn,  function (req, res) {
	res.render('index', {'view':'userProfile'})
})


router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
})
module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/users/signin');
}