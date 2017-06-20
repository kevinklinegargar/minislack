import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
var $ = require('jquery');
import axios from 'axios';
class UsersList extends Component {

	constructor() {
		super();
		
	}

	render() {
		var users = this.props.users;
	
		return (
            <div>
				<div className="sidebar-users-list-label">Users</div>
				<div>
					<ul className="main-nav users-list-ul">
						{users.map(user => {
					
							return <li key={user._id} className={this.props.roomId == user._id?"selected-room":""} onClick={()=>this.props.changeChatRoom(user._id,false)}><a href="#">{user.username}{user.notification > 0?<span className="notification-counter"> {user.notification}</span>:""}</a></li>;
						})}
					</ul>
				</div>
			</div>
			
		);
	}
}
UsersList.contextTypes = {
  router: React.PropTypes.object
};
UsersList.PropTypes={
	uid:PropTypes.string,
	changeChatRoom:PropTypes.func
}
export default UsersList;