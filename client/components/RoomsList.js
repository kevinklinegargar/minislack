import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import axios from 'axios';
class RoomsList extends Component {

	constructor() {
		super();
		
	}
	componentWillMount(){
		
	}
	render() {
		return (
            <div>
				<div className="">Rooms list</div>
				<div>
					<ul className="main-nav">
										
						<li>
							<a href="#">- Bootstrap</a>
						</li>
						<li>
							<a href="#">- Mail Inbox</a>
						</li>
						<li>
							<a href="#">- Form Controls</a>
						</li>
						<li>
							<a href="#">- UI Elements</a>
						</li>
						<li>
							<a href="#">- Calendar / Dates</a>
						</li>
						<li>
							<a href="#">- Drag / Drop</a>
						</li>
						<li>
							<a href="#">- App Views</a>
						</li>
						<li>
							<a href="#">- Another Menu item</a>
						</li>
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