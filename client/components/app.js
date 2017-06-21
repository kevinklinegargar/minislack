import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Route,BrowserRouter,Match} from 'react-router';
import Dashboard from './Dashboard';
import Signin from './Signin';
import Signout from './Signout';
import Signup from './Signup';
import Profile from './Profile';

class App extends Component {
	render () {
		
			return (
			
				<BrowserRouter>
					<div>
						<Match exactly pattern="/" component={Dashboard} />
						<Match exactly pattern="/signin" component={Signin}/>
						<Match exactly pattern="/signup" component={Signup} />
						<Match exactly pattern="/signout" component={Signout}/>
						<Match exactly pattern="/profile/:id" component={Profile}/>
					</div>
				</BrowserRouter>
			
			
		)
		}
}
export default App;
