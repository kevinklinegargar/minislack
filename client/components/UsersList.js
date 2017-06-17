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
				<div className="">Users list</div>
				<div>
					<ul className="main-nav">
						{users.map(user => {
							
							return <li key={user._id} onClick={()=>this.props.changeChatRoom(user._id,false)}><a href="#">{user.username}</a></li>;
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