import React, { Component } from 'react';
import { Link } from 'react-router';
var $ = require('jquery');
import Nav from './Nav';
import axios from 'axios';
class Signout extends Component {

	constructor() {
		super();

	}
  

	render() {
		return (
            
			<div className="form-container">
                <Nav />
                You are Signout
            </div>
		);
	}
}

export default Signout;