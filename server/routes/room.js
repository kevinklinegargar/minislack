var router = require('express').Router();
var mongoose = require('mongoose');
var Room = require('./../models/Room');


router.post('/create/',(req,res) => {
    var name = req.body.name ;
    var newRoom = new Room({
				name:name
		});
    Room.createRoom(newRoom,function(err,room){
        if(err) throw err;
        res.json(room);
    });
});

router.post('/all/',(req,res) => {

   
    Room.getAllRooms(function(err,rooms){
        if(err) throw err;
        res.json(rooms);
    });
});

router.post('/details/',(req,res) => {
    
   
    Room.getRoomsDetailsById(req.body.roomId,function(err,room){
        if(err) throw err;

        res.json(room);
    });
});




module.exports = router;