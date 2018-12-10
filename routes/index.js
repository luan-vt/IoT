var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport')
var indexController = require("../controllers/indexController.js")



/* GET home page. */
router.get('/', isLoggedIn,  indexController.checkin);

router.post('/add-rfid', isLoggedIn, indexController.addRfid);

router.post('/new-list', isLoggedIn, indexController.newList)
router.post('/return-list', isLoggedIn, indexController.returnList)
router.get('/reg-device', indexController.reg)
router.post('/reg-device', indexController.postReg)

router.post('/ignore', indexController.ignore)
router.get('/check-queue', indexController.checkQueue)

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/users/signin');
}