var mongoose = require('mongoose');
var Message = require('./../models/Message');
var Room = require('./../models/Room');
var User = require('./../models/User');
// export function for listening to the socket
module.exports = function (socket) {
	


	socket.on("send:message",function(data){
	
		var newMessage = new Message({
				message:data.message,
				ownerId:data.ownerId,
				roomId:data.roomId,
				isGroupChat:data.isGroupChat
		});
	
		Message.createMessage(newMessage,function(err,res){
			 if(err) throw err;
			 if(res){
				if(newMessage.isGroupChat == true){
					
					Room.getRoomsDetailsById(res.roomId,function(err,room){
							if(err) throw err;
					
							var roomId = room["_id"];
							var participants = room["participants"];
							for(var xx =0;xx < participants.length;xx++){
								var participant = participants[xx];
							
								socket.broadcast.emit("receive:message:"+participant,newMessage);	  
							}
					});




				}else{
					console.log("Private Message.");
					socket.broadcast.emit("receive:message:"+newMessage["roomId"],newMessage);
				}

				
			 } 
		});
		
	})

	socket.on("participants:update",function(data){
		var roomId = data.roomId;
   		var participants = data.participants;
    	Room.updateParticipants(roomId,participants,function(err,room){
        	if(err) throw err;
	
			var roomId = room["_id"];
			var participants = room["participants"];
			// Notify each participants for the new upate of room participants
			for(var xx =0;xx < participants.length;xx++){
				var participant = participants[xx];
				socket.broadcast.emit("participants:update:"+participant,room);	  
			}
        	
    	});	
	});
	socket.on("room:create",function(data){
		 var name = data.name ;
		 var owner = data.owner;
		var newRoom = new Room({
					name:name,
					participants:[owner]
			});
		Room.createRoom(newRoom,function(err,room){
			if(err) throw err;
		
			User.getAllUsers(function(err,users){
			
				for(var ii=0; ii < users.length;ii++){
					
					var user = users[ii];
					// Notify all users for the new for the newly created room
					socket.emit("new:room:created:"+user["_id"],room);
					socket.broadcast.emit("new:room:created:"+user["_id"],room);
			
					
				}
				
			});
			
		});
	})

};