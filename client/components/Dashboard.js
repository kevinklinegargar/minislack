import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import DashboardNav from './DashboardNav';
import UsersList from './UsersList';
import RoomsList from './RoomsList';
import ChatBox from './ChatBox';
import axios from 'axios';
import update from 'react-addons-update';
var socket = io.connect();
class Dashboard extends Component {

	constructor() {
		super();
		this.state = {
			user:{},
			users: [],
			isGroupChat:false,
			roomId:null,
			messages:[],
			notifyNewGroupMessage:{}
		};
		
		
	}

	componentDidMount(){
		
		axios.post('auth/user/details')
		.then(response => {
			
			if(response.data){
				this.setState({user:response.data});
		
			}
			this.getAllUsers(users => {
				if(users.length > 0 ){
					this._initChatRoom(res => {
						if(res){
						
							this.getPrivateMessage(this.state.roomId,this.state.user["_id"]);
						}
					});
					this._initSocketEvents();
				}
			});
			
		
	
			
			//socket.on('connected', this._initialize);
		}).catch( e => {
			this.context.router.transitionTo('signin');	
		});
		
		
	}
	_initSocketEvents(){

		socket.on("receive:message:"+this.state.user["_id"],this.ioReceiveMessage.bind(this));
		socket.on("new:user",this.ioNewUser.bind(this));
		
		socket.on("participants:update:"+this.state.user["_id"],(room =>{
		
			this.updateRoomParticipants(room._id,room.participants);
		}));
	}
	getPrivateMessage(userId_1,userId_2){
		axios.post("message/private",{userId_1:userId_1,userId_2:userId_2}).then(response => {
			
			this.setState({messages:response.data});
			
		}).catch(e => {
			console.log("error");
			console.log(e);
		});
	}
	getRoomMessage(id){
		axios.post("message/room",{id:id}).then(response => {
			
			this.setState({messages:response.data})
		}).catch(e => {
			console.log("error");
			console.log(e);
		});
	}
	ioNewUser(user){
		user.notification = 0;
		let users = this.state.users;
		users = update(users,{$push: [user]});
		this.setState({users:users});	
	}
	ioReceiveMessage(data){
		var messages = this.state.messages;
		if(data.isGroupChat == false){
			
			if(this.state.roomId == data.ownerId){
				
				messages = update(messages,{$push: [data]});
				this.setState({messages:messages});		
			}else{
				let users = this.state.users;
				for(var xx=0;xx < users.length;xx++){
					var user = users[xx];
					if(user._id == data.ownerId){
						users[xx].notification++;
					}
				}
				this.setState({users:users});
			}
		}else{
			if(this.state.roomId == data.roomId){

				messages = update(messages,{$push: [data]});
				this.setState({messages:messages});
			}else{
				this.setState({notifyNewGroupMessage:{id:data.roomId,message:data.message,action:"new"}});
			}
			
		}

	}
	getAllUsers(callback) {
		axios.get('user/all').then( (users) => {
			var users = users.data;
			for (var ii = 0; ii < users.length; ii++) {
				users[ii]["participant"] = false;
				users[ii]["notification"] = 0;
				if (users[ii]["_id"] === this.state.user["_id"]) {
					users.splice(ii--, 1);
				}
			}
			this.setState({users:users});
			callback(this.state.users);
		});
		
	}
	_initChatRoom(cb){
		
		if(this.state.users.length > 0){
			this.setState({roomId:this.state.users[0]["_id"]});
			cb(true);
		}
		cb(false);
		
	}
	updateRoomParticipants(roomId,participants){
		let users = this.state.users;
		for(var xx = 0; xx < users.length;xx++){
			var user = users[xx];
			users[xx]["participant"] = false;

			for(var yy=0;yy < participants.length;yy++){
				var participant = participants[yy];

				if (user._id == participant){
					users[xx]["participant"] = true;
				
				}
			}
		}
		
		this.setState({users:users});
		this.setState({isGroupChat:true});
		this.setState({roomId:roomId});
	}
	onChangeChatRoom(id,isGroupChat){

		
		if(isGroupChat == false){
			this.setState({isGroupChat:isGroupChat});
			this.setState({roomId:id});
			this.getPrivateMessage(id,this.state.user["_id"]);
			let users = this.state.users;
			for(var mm=0;mm < users.length;mm++){
				var user = users[mm];
				if(user._id == id){
					users[mm]["notification"]=0;
				}
			}
		}else{
			this.getRoomMessage(id);
			this.setState({notifyNewGroupMessage:{id:id,message:false,action:"clear"}});
			axios.post('room/details',{roomId:id}).then( room =>{
		
					var participants = room.data.participants;
					this.updateRoomParticipants(id,participants);
			
			
				}).catch(e => {
					console.log(e);
				});
		}

	}
	onSendMessage(message){
		
		
		var newMessage = {
			message:message,
			ownerId:this.state.user["_id"],
			roomId:this.state.roomId,
			isGroupChat:this.state.isGroupChat
		};
		var messages = this.state.messages;
		messages = update(messages,{$push: [newMessage]});
		this.setState({messages:messages});
		socket.emit("send:message",newMessage);
	}

	render() {
	
		return (
		
			<div className="wrapper">
				 <DashboardNav/>
				<div className="sideBar">
					<UsersList roomId={this.state.roomId} users={this.state.users} changeChatRoom={this.onChangeChatRoom.bind(this)} />
					<RoomsList  roomId={this.state.roomId} notifyNewGroupMessage={this.state.notifyNewGroupMessage} changeChatRoom={this.onChangeChatRoom.bind(this)} user={this.state.user}/>
				</div>
				<div className="main-section">
					
					<div className="content">
						<ChatBox 
						isGroupChat={this.state.isGroupChat} 
						roomId={this.state.roomId} 
						sendMessage = {this.onSendMessage.bind(this)}
						messages = {this.state.messages}
						users={this.state.users}
						user={this.state.user}
						/>
					</div>
					
				</div>
                
				
            </div>
		);
	}
}
Dashboard.contextTypes = {
  router: React.PropTypes.object
};
Dashboard.PropTypes= {

}
export default Dashboard;