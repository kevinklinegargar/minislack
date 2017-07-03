import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import axios from 'axios';
import update from 'react-addons-update';
var socket = io.connect();
class RoomsList extends Component {

	constructor() {
		super();
		this.state = {
			roomName:"",
			rooms:[]
		}
		this.onChangeRoomNameVal = this.onChangeRoomNameVal.bind(this);
		this.ioNewRoom =this.ioNewRoom.bind(this);
	}
	componentDidUpdate() {
		//
	}
	componentDidMount(){
		// Populate all the room in the sidebar
		this.udpateAllRooms();
		
	
	}
	udpateAllRooms(callback){
		axios.post('room/all').then( rooms => {
			var rooms = rooms.data;
			for(var xx=0;xx < rooms.length;xx++){
				var room = rooms[xx];
				rooms[xx]["notification"]=0;
			}
			this.setState({rooms:rooms});
			this.updateRoomsLockIndicator();
		
		});
	}
	componentWillReceiveProps(nextProps){
		// Wait for the props.user will have value then initialize socket listeners
		if(nextProps.user !== this.props.user){
			socket.on("new:room:created:"+nextProps.user["_id"],this.ioNewRoom);
		
			socket.on("participants:update:"+nextProps.user["_id"],(room =>{
				
				this.udpateAllRooms();
			}));
			this.udpateAllRooms();	
		}
		// Increment the notification indicator if there's a new message
		if(nextProps.notifyNewGroupMessage !== this.props.notifyNewGroupMessage){
	
			let rooms = this.state.rooms;
			for(var ii=0;ii <rooms.length;ii++){
				var room = rooms[ii];
				if(room["_id"] == nextProps.notifyNewGroupMessage.id){
					if(nextProps.notifyNewGroupMessage.action=="new"){
						rooms[ii]["notification"]++;
					}else{
						rooms[ii]["notification"]=0;
					}

				}
				
			}

			this.setState({rooms:rooms});
			
		}
		
	}
	updateRoomsLockIndicator(){
		var user = this.props.user;
		var rooms = this.state.rooms;
		
		for(var yy=0;yy < rooms.length;yy++){
			var room = rooms[yy];
			rooms[yy]["imParticipant"] = false;
			var participants = room.participants;
			for(var xx=0;xx < participants.length;xx++){
				var participant = participants[xx];
				if(user._id == participant){
					rooms[yy]["imParticipant"] = true;
				}
			}
		}
		this.setState({rooms:rooms});
		
	}
	onChangeRoomNameVal(e){
		this.setState({roomName:e.target.value});
	}

	ioNewRoom(data){
		// Update the room list for a new created room from other users with socketio
		var rooms = this.state.rooms;
	
		rooms = update(rooms,{$push: [data]});
		this.setState({rooms:rooms});
		this.updateRoomsLockIndicator();
		
	}
	onCreateRoom(){
		socket.emit("room:create",{name:this.state.roomName,owner:this.props.user._id});
		

	}
	render() {
		var rooms = this.state.rooms;

		return (
            <div>
				<div className="sidebar-rooms-list-label">Rooms</div>
				<div className="add-room-wrapper">
					<input type="text"  onChange={this.onChangeRoomNameVal} className="" placeholder="Room name"/>
					<button className="create-new-room" onClick={this.onCreateRoom.bind(this)}>+ Room</button>
				</div>
				
				<div>
					<ul className="main-nav rooms-list-ul">
						{rooms.map(room => {
							if(room.imParticipant == true){
								return <li key={room._id} className={this.props.roomId == room._id?"selected-room":""} onClick={()=>this.props.changeChatRoom(room._id,true)}><a href="#">{room.name}{room.notification > 0?<span className="notification-counter"> {room.notification}</span>:""}</a></li>;
							}
							
						})}
					</ul>
				</div>
			</div>
			
		);
	}
}
RoomsList.contextTypes = {
  router: React.PropTypes.object
};
export default RoomsList;