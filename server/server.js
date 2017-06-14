// PACKAGES //
var path = require('path');
var fs = require('fs');
var express = require('express');
var Router = require('react-router').Router;
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// IMPORTS //
var db = require('./services/db.js');
var indexRoutes = require('./routes/index');
var apiRoutes = require('./routes/api');
var authRoutes = require('./routes/auth');
var bodyParser = require('body-parser');



// CREATE APP //
var app = express();


// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});



// MIDDLEWARE //
//app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Express Session
app.use(cookieParser());
app.use(session({
		secret: 'h0mel1ke-!s3cret19>',
		saveUninitialized: true,
		resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());



// ERROR HANDLER //
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
});

app.use(express.static(path.join(__dirname, '../client')));

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
			var namespace = param.split('.')
			, root    = namespace.shift()
			, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));

// Connect Flash
app.use(flash());
// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
// ROUTES //


app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('*', function(req, res){
  res.redirect('/');
});
module.exports = app;
