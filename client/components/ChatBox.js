import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import axios from 'axios';
var socket = io.connect();
class ChatBox extends Component {

	constructor() {
		super();
		
	}
	componentWillReceiveProps(nextProps){
		
		if(nextProps.roomId !== this.props.roomId){
		
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
	render() {
		var messages = this.props.messages;

		return (
            
			<div className="chatbox-wrapper">
				<div>{this.props.roomId}</div>
				<div>{this.props.isGroupChat}</div>
				<div className="chatbox-conversation">
					{messages.map(item => {
							
							return <div key={item.message}> {item.message}</div>;
					})}
				</div>
				<div className="chat-type-here-box">
					<input type="text" onKeyPress={this.handleKeyPress.bind(this)} className="chat-type-here" placeholder="Type here..."/>
				</div>
                
            </div>
		);
	}
}
ChatBox.contextTypes = {
  router: React.PropTypes.object
};
export default ChatBox;