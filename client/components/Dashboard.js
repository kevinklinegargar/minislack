import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import Nav from './Nav';
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
			messages:[]
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
	}
	getPrivateMessage(userId_1,userId_2){
		axios.post("message/private",{userId_1:userId_1,userId_2:userId_2}).then(response => {
			
			this.setState({messages:response.data})
		}).catch(e => {
			console.log("error");
			console.log(e);
		});
	}
	ioReceiveMessage(data){
		if(data.isGroupChat == false){
			if(this.state.roomId == data.ownerId){
				var messages = this.state.messages;
	
				messages = update(messages,{$push: [data]});
			//	messages = messages.push({message:"gargar"});

				this.setState({messages:messages});
			
					
			}
		}

	}
	getAllUsers(callback) {
		axios.get('user/all').then( (users) => {
			var users = users.data;
			for (var ii = 0; ii < users.length; ii++) {
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
	onChangeChatRoom(id,isGroupChat){
		
		this.setState({isGroupChat:isGroupChat});
		this.setState({roomId:id});
		if(isGroupChat == false){
			this.getPrivateMessage(id,this.state.user["_id"]);
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
			
				<div className="sideBar">
					<UsersList users={this.state.users} changeChatRoom={this.onChangeChatRoom.bind(this)} />
					<RoomsList/>
				</div>
				<div className="main-section">
					<div className="content">
						<ChatBox 
						isGroupChat={this.state.isGroupChat} 
						roomId={this.state.roomId} 
						sendMessage = {this.onSendMessage.bind(this)}
						messages = {this.state.messages}
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