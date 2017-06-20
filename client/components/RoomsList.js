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
		socket.emit("room:create",{name:this.state.roomName});
		

	}
	render() {
		var rooms = this.state.rooms;

		return (
            <div>
				<div className="">Rooms list</div>
				<div>
					<input type="text"  onChange={this.onChangeRoomNameVal} className="" placeholder="Room name"/>
					<button className="create-new-room" onClick={this.onCreateRoom.bind(this)}>+ Room</button>
				</div>
				
				<div>
					<ul className="">
						{rooms.map(room => {
							
							return <li key={room._id} onClick={()=>this.props.changeChatRoom(room._id,true)}><a href="#">{room.name}<span>---{room.notification}</span></a></li>;
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