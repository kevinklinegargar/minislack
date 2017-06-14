var express = require('express');
function ensureAuthenticated(req, res, next){
    console.log("Middle ware");
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
	//	res.redirect('/users/login');
    console.log("Not authorized");
	}
}

module.exports = ensureAuthenticated;