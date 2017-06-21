var router = require('express').Router();
var mongoose = require('mongoose'),
	User = mongoose.model('User');


router.get('/all',(req,res) => {
 
    User.getAllUsers(function(err,users){
        res.json(users);
    });
});
router.post('/detail',(req,res) => {
    
    User.getUserById(req.body.id,function(err,user){
         if(err) throw err;
        res.json(user);
    });
});

module.exports = router;