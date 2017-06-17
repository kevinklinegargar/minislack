var mongoose = require('mongoose');
var Message = require('./../models/Message');
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
	
				socket.broadcast.emit("receive:message:"+newMessage["roomId"],newMessage);
			 } 
		});
		
	})

//   // notify other clients that a new user has joined
//   socket.broadcast.emit('user:join', {
//     name: name
//   });

//   // broadcast a user's message to other users
//   socket.on('send:message', function (data) {
//     socket.broadcast.emit('send:message', {
//       user: name,
//       text: data.text
//     });
//   });

//   // validate a user's name change, and broadcast it on success
//   socket.on('change:name', function (data, fn) {
//     if (userNames.claim(data.name)) {
//       var oldName = name;
//       userNames.free(oldName);

//       name = data.name;
			
//       socket.broadcast.emit('change:name', {
//         oldName: oldName,
//         newName: name
//       });

//       fn(true);
//     } else {
//       fn(false);
//     }
//   });

//   // clean up when a user leaves, and broadcast it to other users
//   socket.on('disconnect', function () {
//     socket.broadcast.emit('user:left', {
//       name: name
//     });
//     userNames.free(name);
//   });
};