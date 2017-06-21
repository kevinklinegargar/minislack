import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import CheckBox from './CheckBox';
import axios from 'axios';
var socket = io.connect();
class ChatBox extends Component {

	constructor() {
		super();
		this.state = {
			optionsChecked: []
		}
		this.ioUpdateParticipants = this.ioUpdateParticipants.bind(this);
	}
	componentDidUpdate() {
		$(".main-section").animate({ scrollTop:88888 }, 0);
	}
	componentDidMount(){
		$(".main-section").animate({ scrollTop:88888 }, 0);
	}
	componentWillReceiveProps(nextProps){
	
		if(nextProps.roomId !== this.props.roomId){
			if(nextProps.isGroupChat  == true ){
					let checkedArray = [this.props.user["_id"]];
					let users = nextProps.users;
					for(var yy =0;yy < users.length;yy++){
							var user = users[yy];
							if(user["participant"] == true){
								
								checkedArray.push(user["_id"]);
							}
						}
						//checkedArray.push(this.props.user["_id"]);
						this.setState({optionsChecked: checkedArray});
					
			}	
		}
	
		
		
	}
	ioUpdateParticipants(e){
		e.preventDefault();
	
		socket.emit("participants:update",{roomId:this.props.roomId,participants:this.state.optionsChecked});
		
	}
	toggleCheckBox(event) {
    
    	let checkedArray = this.state.optionsChecked;
      	let selectedValue = event.target.value;
        
        if (event.target.checked === true) {
        
        	checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });
			var users = this.props.users;
			var userId = event.target.value;
			for(var yy =0;yy < users.length;yy++){
				var user = users[yy];
				if(user["_id"] == userId){
					users[yy]["participant"] = true;
				}
			}
	
                        
        } else {
        
        	let valueIndex = checkedArray.indexOf(selectedValue);
			checkedArray.splice(valueIndex, 1);
            
            this.setState({
              optionsChecked: checkedArray
            });
			var users = this.props.users;
			var userId = event.target.value;
			for(var yy =0;yy < users.length;yy++){
				var user = users[yy];
				if(user["_id"] == userId){
					users[yy]["participant"] = false;
				}
			}
            
        }
    
    }

	
	handleKeyPress(e){
		
		if(e.key == "Enter"){
			var message = e.target.value;
			if(message !== ""){
				this.props.sendMessage(message);
				//socket.emit("send:message",newMessage)
			}
		

		}

	}
	getMessageOwnerUsername(userId){
		var users = this.props.users;
		for(var xx=0;xx < users.length;xx++){
			if(userId == users[xx]["_id"]){
				return "-"+users[xx]["username"];
			}
		}
		return "";
	}
	render() {
		var messages = this.props.messages;
		let users = this.props.users;
		console.log(messages);
		let outputCheckboxes = users.map(function(user, i){
        	return (<div key={user._id}><CheckBox checked={user.participant} value={user._id} id={'string_' + user._id} onChange={this.toggleCheckBox.bind(this)} /><label htmlFor={'string_' + i}>{user.username}</label></div>)
        }, this);
		return (
      
			<div className="chatbox-wrapper">
					     
					<div className="chatbox" className ={ this.props.isGroupChat == false?'chatbox chatbox-full-width':'chatbox'}>
						<div className="chatbox-conversation">
							<div className="chatbox-conversation-messages">
							{messages.map(item => {
									
									return 	<div key={item._id} className="hm-message-div">
												
												<span  className={"hm-message-span "+(item.ownerId == this.props.user._id?"hm-message-owner":"hm-message-not-owner")}> {item.message}</span>
												<br/>
												{
													this.props.isGroupChat == true?<span className="messagge-owner-name">{this.getMessageOwnerUsername(item.ownerId)}</span>:""
												}
												
											</div>;
							})}
							</div>
						</div>
						<div className="chat-type-here-box">
							<input type="text" onKeyPress={this.handleKeyPress.bind(this)} className="chat-type-here" placeholder="Type here..."/>
							
						</div>
					</div>
					{this.props.isGroupChat == true ? 
						<div className="chatbox-participants">
							<div>Participants</div>
							<form onSubmit={this.ioUpdateParticipants}>
								{outputCheckboxes}
							
								<button className="btn btn-success" type="submit">Save</button>
							</form>
						</div>
						:
						""
					}
					
				</div>
			
		);
	}
}
ChatBox.contextTypes = {
  router: React.PropTypes.object
};
export default ChatBox;