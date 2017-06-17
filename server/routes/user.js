var router = require('express').Router();
var mongoose = require('mongoose'),
	User = mongoose.model('User');


router.get('/all',(req,res) => {
 
    User.getAllUsers(function(err,users){
        res.json(users);
    });
});


module.exports = router;