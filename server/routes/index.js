var path = require('path');
var router = require('express').Router();

//var ensureAuthenticated = require('./../middlewares/ensureAuthenticated.js');
function ensureAuthenticated(req, res, next){
    console.log("Middle ware");
	if(req.isAuthenticated()){
    console.log("authorized");
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
	//	res.redirect('/users/login');
    console.log("Not authorized");
	}
}

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});


module.exports = router;
