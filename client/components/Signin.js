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
		this.base_url = 'http://localhost:8000';
		// this.showSessionMsg = props.location.query? props.location.query.session:true;
		// this._handlePasswordChange = this._handlePasswordChange.bind(this);
		// this._handleEmailChange = this._handleEmailChange.bind(this);
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
        //console.log(this.state);
    
		
  		axios.post('auth/signin',{'username':this.state.username,'password':this.state.password})
		  .then(response => {
			  if(response.data == true){
				  this.context.router.transitionTo('/');	
			  }else{
					this.context.router.transitionTo('signin');  
			  }
		  })
		  .catch( e => {
			  alert("Wrong username or password.");
		  });

	}

	render() {

		const { jokes } = this.state;

		return (
            
			<div className="form-container">
                <Nav />
                <form ref='user_form' onSubmit={this._onSubmit}>
              
                    <label className="control-label">Username </label>
                    <input name="username" ref="username" type="text" className="form-control" id="username" placeholder="Username" onChange={this._onChange}/>
           
                    <label className="control-label">Password</label>
                    <input name="password" ref="password" type="password" className="form-control" id="password" placeholder="Password"  onChange={this._onChange}/>
          
                    <button type="submit" className="btn btn-default">Sign-in</button>
                </form>
            </div>
		);
	}
}
Signin.contextTypes = {
  router: React.PropTypes.object
};
export default Signin;