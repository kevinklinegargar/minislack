import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
var $ = require('jquery');
import Nav from './Nav';
import axios from 'axios';
class Signup extends Component {

	constructor(props,context) {
		super();
		this.state = {};
		this.state.error = "";
		this.state.email = "kevin@gmailc.com";
		this.state.password = "kevinklinegargargar2";
        this.state.username = "kevin";
		this.base_url = 'http://localhost:8000';
		// this.showSessionMsg = props.location.query? props.location.query.session:true;
		// this._handlePasswordChange = this._handlePasswordChange.bind(this);
		// this._handleEmailChange = this._handleEmailChange.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
		
	}

    _onChange(e) {
      //   console.log(this);
        var state = {};
        state[e.target.name] =  $.trim(e.target.value);
        this.setState(state);
       
    }
    _onSubmit(e) {
		e.preventDefault();
        //console.log(this.state);
		//console.log("redirect");
		
		
  		axios.post('auth/signup',{'email':this.state.email,'password':this.state.password,'username':this.state.username
		}).then( response => {
			if(response.data === true){
				alert("You are successfully registered. You can now Signin.");
				this.context.router.transitionTo('signin');
				
			}
		}).catch( error => {
			console.log(error);
		});
		// if(this.state.errorPassword == '' && this.state.errorEmail == ''){
		// 	this.setState({error : 'Signing in ...'});
		// 	auth.login(this.state.email, this.state.password, (loggedIn) => {
		// 		if (!loggedIn)
		// 		return this.setState({ error: "Login Failed" })

		// 	})
		// }

	}

	render() {

		return (
            
			<div className="form-container">
                <Nav />
                <form ref='user_form' onSubmit={this._onSubmit}>
              
                    <label className="control-label">Username </label>
                    <input  name="username" ref="username" type="text" className="form-control" id="username" placeholder="Username" onChange={this._onChange}/>
           
                    <label className="control-label" >Email address</label>
                    <input  name="email" ref="email" type="email" className="form-control" id="email" placeholder="Email" onChange={this._onChange}/>
       
                    <label className="control-label">Password</label>
                    <input  name="password" ref="password" type="password" className="form-control" id="password" placeholder="Password"  onChange={this._onChange}/>
          
                    <button type="submit" className="btn btn-default">Sign-up</button>
                </form>
            </div>
		);
	}
}
Signup.contextTypes = {
  router: React.PropTypes.object
};
export default Signup;