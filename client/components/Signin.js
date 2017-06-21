import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import Nav from './Nav';
import axios from 'axios';

class Signin extends Component {

	constructor() {
		super();
		this.state = {};
		this.state.error = "";
		this.state.email = "";
		this.state.password = "";
		this._onSubmit = this._onSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
	}
    _onChange(e) {

        var state = {};
        state[e.target.name] =  $.trim(e.target.value);
        this.setState(state);
       
    }
    _onSubmit(e) {

		e.preventDefault();
  		axios.post('auth/signin',{'username':this.state.username,'password':this.state.password})
		  .then(response => {
			  if(response.data == true){
				  //If successful signin redirect to the dashboard
				  this.context.router.transitionTo('/');	
			  }else{
					// Redirect to signin page if its fail
					this.context.router.transitionTo('signin');  
			  }
		  })
		  .catch( e => {
			  alert("Wrong username or password.");
		  });

	}

	render() {

		return (
         
			<div >
                <Nav />
                <form ref='user_form' className="form-signin" onSubmit={this._onSubmit}>
              
                    <label className="control-label">Username </label>
                    <input name="username" ref="username" type="text" className="form-control" id="username" placeholder="Username" onChange={this._onChange}/>
           
                    <label className="control-label">Password</label>
                    <input name="password" ref="password" type="password" className="form-control" id="password" placeholder="Password"  onChange={this._onChange}/>
          
                    <button type="submit" className="btn btn-default btn-signin">Sign-in</button>
                </form>
            </div>
		);
	}
}
Signin.contextTypes = {
  router: React.PropTypes.object
};
export default Signin;