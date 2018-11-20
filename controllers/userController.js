var exports = module.exports = {}

exports.signin = function (req, res) {
	res.render('signin', {message:req.flash('signinMessage')});
}
