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
		this.handleUploadFile = this.handleUploadFile.bind(this);
	}
	componentDidUpdate() {
		//Scroll the message box to bottom everytime there's new message.
		$(".main-section").animate({ scrollTop:88888 }, 0);
	}
	componentDidMount(){
		//Scroll the message box to bottom after rendering all the messages.
		$(".main-section").animate({ scrollTop:88888 }, 0);
	}
	componentWillReceiveProps(nextProps){
		//Check if the user swtiched to a different room or private message
		if(nextProps.roomId !== this.props.roomId){
			//Update the this.state.optionsChecked for the list of participants involve on this group chat
			if(nextProps.isGroupChat  == true ){
					let checkedArray = [this.props.user["_id"]];
					let users = nextProps.users;
					for(var yy =0;yy < users.length;yy++){
							var user = users[yy];

							//Checked if the login user is also a participant then add it to the array
							if(user["participant"] == true){
								checkedArray.push(user["_id"]);
							}
						}
						this.setState({optionsChecked: checkedArray});
					
			}	
		}
	
		
		
	}
	ioUpdateParticipants(e){
		e.preventDefault();
		//Update the db for the new room participants using socketio
		socket.emit("participants:update",{roomId:this.props.roomId,participants:this.state.optionsChecked});	
	}
	toggleCheckBox(event) {
		//Handle the participants checkboxes.
    	let checkedArray = this.state.optionsChecked;
      	let selectedValue = event.target.value;
        
        if (event.target.checked === true) {
        
        	checkedArray.push(selectedValue);
            this.setState({optionsChecked: checkedArray});
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
		//When the enter pressed, send the message through the parent method
		if(e.key == "Enter"){
			var message = e.target.value;
			if(message !== ""){
				this.props.sendMessage(message,'text');
				$(".chat-type-here").val("");
				//socket.emit("send:message",newMessage)
			}
		

		}

	}
	handleUploadFile(e){
		
		var fd = new FormData();    
        fd.append('file', e.target.files[0]);

        $.ajax({
            url: 'upload/file',
            data: fd,
			
            dataType: "JSON",
            processData: false,
            contentType: false,
            type: 'POST',
            success: (data)=>{
				this.props.sendMessage(data.filename,'image');
             
            },
			error: function(jqXHR, textStatus, err) {
			
				 if(jqXHR.responseText == "invalid_format"){
					alert("Only image file is allowed.");
					
				 }
			}
        });
        e.preventDefault()	
	}
	getMessageOwnerUsername(userId){
		//get the message username by user id
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
												{
													item.type== "image"?
													<span ><img className={"chat-item-image "+(item.ownerId == this.props.user._id?"chat-item-image-owner":"chat-item-image-not-owner")} src={"./../uploads/"+item.message} data-lity/></span>
													:
													<span  className={"hm-message-span "+(item.ownerId == this.props.user._id?"hm-message-owner":"hm-message-not-owner")}> {item.message}</span>
												}
												
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
								<div className="image-upload">
									<label htmlFor="file-input">
										<img src="./../css/images/image_upload.png"/>
									</label>

									<input type="file" className="input-file-upload" id="file-input" name="avatar" onChange={this.handleUploadFile}/>
								</div>
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