import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Route,BrowserRouter,Match} from 'react-router';
import CelebrityJokes from './CelebrityJokes';
import FoodJokes from './FoodJokes';

class App extends Component {
	render () {
		
    	return (
			
				<BrowserRouter>
                    <div>
                        <Match exactly pattern="/" component={FoodJokes} />
						<Match exactly pattern="/special" component={CelebrityJokes}/>
                    </div>
                </BrowserRouter>
			
			
		)
  	}
}
export default App;
