'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// Message Schema
var RoomSchema = mongoose.Schema({
    name:{
            type:String
    },
    participants:{
        type : Array , "default" : [] 
    }
    
});

var Room = mongoose.model('Room', RoomSchema);

Room.createRoom = function(roomName,callback){
	
	roomName.save(callback);

}
Room.getAllRooms = function(callback){
    Room.find({},{},callback);
}
Room.getRoomsDetailsById = function(roomId,callback){
    Room.findById(roomId,{},callback);
}
Room.updateParticipants= function(roomId,participants,callback){
	Room.findByIdAndUpdate(roomId,{participants:participants},{new: true},callback);


}


module.exports = Room;
