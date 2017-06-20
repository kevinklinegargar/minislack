import React, { Component } from 'react';
import axios from 'axios';
import update from 'react-addons-update';

class CheckBox extends React.Component {
    
    render() {
        
        return (

        	<input type="checkbox" checked={this.props.checked}  id={this.props.id} value={this.props.value} onChange={this.props.onChange} />
        )
    }
    
}

export default CheckBox;