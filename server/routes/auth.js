var router = require('express').Router();
var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
	function(username, password, done) {

	 User.getUserByUsername(username, function(err, user){
	 	if(err) throw err;
	 	if(!user){
	 		return done(null, false, {message: 'Unknown User'});
	 	}

	 	User.comparePassword(password, user.password, function(err, isMatch){
	 		if(err) throw err;
	 		if(isMatch){
	 			return done(null, user);
	 		} else {
	 			return done(null, false, {message: 'Invalid password'});
	 		}
	 	});
	 });
	}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/signin',
	passport.authenticate('local'),
	function(req, res) {

		res.send(true);
});

router.get('/logout', function(req, res){
	req.logout();

	//req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
});

router.post('/signup', (req, res) => {
		
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var socket = req.app.get('socketio');

	//var errors = false || req.validationErrors();
	var errors = false;
	
	if(errors){
		res.render('signup',{
			errors:errors
		});
	} else {
	
		var newUser = new User({
			email:email,
			username: username,
			password: password
		});
		
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			socket.emit("new:user",user);
		});
	
    	
		res.send(true);
	}
});

router.post('/user/details',(req,res)=> {
	if(req.isAuthenticated()){
		
		res.json(req.user)
	} else {
		//req.flash('error_msg','You are not logged in');
	//	res.redirect('/users/login');
    	res.status(401).send(false);
	}
});
module.exports = router;