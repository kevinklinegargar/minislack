import React,{Component} from 'react';
import {BrowserRouter, Link } from 'react-router';
import axios from 'axios';
class DashboardNav extends Component {
	signout(){
		axios.post('/auth/signout/');
	}
	render() {
    	return (
      		<nav className="dashboard-nav navbar navbar-default">
        		<div className="navbar-header">
          			<Link className="navbar-brand" to="/">Kevin HomeLike</Link>
        		</div>
				<ul className="nav navbar-nav navbar-right">
					
					<li><Link to="/signin"><button onClick={this.signout}className="btn btn-danger log">Signout {this.props.username}</button></Link></li>
				</ul>
      		</nav>
    	)
  	}
}

export default DashboardNav;