import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import Nav from './Nav';
import axios from 'axios';
class Dashboard extends Component {

	constructor() {
		super();
		axios.post('auth/user/details')
		.then(response => console.log(response.data))
		.catch( e => {
			this.context.router.transitionTo('signin');	
		});
	}
	render() {
		return (
            
			<div className="form-container">
                <Nav />
                You are in Dashboards
            </div>
		);
	}
}
Dashboard.contextTypes = {
  router: React.PropTypes.object
};
export default Dashboard;