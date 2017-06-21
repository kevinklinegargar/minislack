import React, { Component } from 'react';
import { Link } from 'react-router';
import DashboardNav from './DashboardNav';
import axios from 'axios';
class Profile extends Component {

	constructor() {
		super();
        this.state = {
            id:"",
            user:{},
            quotes:[
                "Fall seven times, stand up eight.",
                "If you want something you've never had. You've got to do something you've never done.",
                "You miss 100% of the shots. You don't take.",
                "Just because you are close to your goal doesn't mean stop.",
                "It is not the mountain we conquer but ourselves.",
                "Your best teacher is your last mistake.",
                "Don't compare your Chapter 1 to someone Chapter 20."
            ]
        }

	}
    componentDidMount(){
       // console.log(this.props);
        var id = this.props.params.id;
        this.setState({id:id});
        axios.post('/auth/user/details').then(response => {
			
			if(response.data){
				axios.post('/user/detail/',{id:this.state.id}).then(user =>{
                    
                    this.setState({user:user.data});
                    console.log(this.state.user);
                }).catch(e => {
                    console.log("Error:");
                    console.log(e);
                });
		
			}
		}).catch( e => {
			this.context.router.transitionTo('signin');	
		});
    }

	render() {
        var quotes = this.state.quotes;
        var quote = quotes[Math.floor(Math.random() * quotes.length)];
		return (
		
			<div className="wrapper">
				 <DashboardNav username={this.state.user.username}/>
                 <div className="profile-box">
                     <div><img src="/css/images/user.png"/></div>
                     <div className="profile-username">{this.state.user.username}</div>
                     <div className="profile-email">{this.state.user.email}</div>
                     
                </div>
                <div className="profile-quote" >" {quote} "</div>
            </div>
		);
	}
}
Profile.contextTypes = {
  router: React.PropTypes.object
};

export default Profile;