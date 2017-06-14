import React,{Component} from 'react';
import {BrowserRouter, Link } from 'react-router';
import './../css/app.css';

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Chuck Norris World</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
         
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/signin"><button className="btn btn-info log">Signin</button></Link></li>
          <li><Link to="/signup"><button className="btn btn-danger log">Signup</button></Link></li>
        </ul>
      </nav>
    )
  }
}

export default Header;