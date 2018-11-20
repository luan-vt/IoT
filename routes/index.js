var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.ap){
		res.send(bcrypt.hashSync('123', bcrypt.genSaltSync(8), null));
	}
	else{
		req.session.ap = 123;
		res.send('Not set');
	} 
  //res.render('index', { title: 'Express' });
});

module.exports = router;
