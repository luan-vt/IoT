var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, user){
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id).then(function (user) {
			if(user){
				done(null, user.get());
			}
			else{
				done(user.errors, null);
			}
		});
	});

	passport.use('local-signin', new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},

		function (req, username, password, done) {
			var User = user;
			var isValidPassword = function(userpass, password){
				return bcrypt.compareSync(password, userpass);
			}

			User.findOne({
				where:{
					username: username
				}
			}).then(function(user){
				if (!user) {
					return done(null, false, req.flash("signinMessage", "Tên đăng nhập hoặc mật khẩu không đúng"));
				}

				if(!isValidPassword(user.password, password)){
					return done(null, false, req.flash("signinMessage", "Tên đăng nhập hoặc mật khẩu không đúng"));
				}

				var userinfo = user.get();
				return done(null, userinfo);
			}).catch(function (err) {
				console.log("Error: ", err);
				return done(null, false, req.flash("signinMessage", "Có lỗi xảy ra trong quá trình đăng nhập"));
			})
		}
	));
}