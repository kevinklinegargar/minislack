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
	componentDidMount(){
		axios.post('room/all').then( rooms => {
			var rooms = rooms.data;
			for(var xx=0;xx < rooms.length;xx++){
				var room = rooms[xx];
				rooms[xx]["notification"]=0;
			}
			this.setState({rooms:rooms});
		});
	
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.user !== this.props.user){
			socket.on("new:room:created:"+nextProps.user["_id"],this.ioNewRoom);	
		}
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
	onChangeRoomNameVal(e){
		this.setState({roomName:e.target.value});
	}

	ioNewRoom(data){

		var rooms = this.state.rooms;
	
		rooms = update(rooms,{$push: [data]});
		this.setState({rooms:rooms});
		
		
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
							
							return <li key={room._id} className={this.props.roomId == room._id?"selected-room":""} onClick={()=>this.props.changeChatRoom(room._id,true)}><a href="#">{room.name}{room.notification > 0?<span className="notification-counter"> {room.notification}</span>:""}</a></li>;
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