var router = require('express').Router();
var mongoose = require('mongoose');
var Message = require('./../models/Message');


router.post('/private/',(req,res) => {
    var userId_1 = req.body.userId_1 ;
    var userId_2 = req.body.userId_2;

    Message.getPrivateMessages(userId_1,userId_2,function(err,messages){
        if(err) throw err;
        res.json(messages);
    });
});


module.exports = router;