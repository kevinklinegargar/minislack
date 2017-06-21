'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// Message Schema
var MessageSchema = mongoose.Schema({
    message:{
        type:String
    },
	ownerId: {
		type:String
	},
	roomId: {
		type: String
	},
	isGroupChat: {
		type: Boolean
	}
});

var Message = mongoose.model('Message', MessageSchema);

Message.createMessage = function(newMessage,callback){
	
	newMessage.save(callback);

}
Message.getPrivateMessages= function(userId_1,userId_2,callback){
	// Get all the messages between two users. 
	Message.find(
		{
			$or:[
				{$and:[{roomId:userId_1},{ownerId:userId_2}]},
				{$and:[{roomId:userId_2},{ownerId:userId_1}]}
			]
		},
		{},
		callback
	)
}
Message.getRoomMessages= function(id,callback){

	Message.find(
		{roomId:id},
		{},
		callback
	)
}


module.exports = Message;
