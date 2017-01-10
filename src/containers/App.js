
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Redirect } from 'react-router';

import NavBar from 'components/NavBar';
import Home from './Home';
import Settings from './Settings';

class App extends Component {
	render(){
		return (
			<div>
				<NavBar />
				
				<div className="container">
					<Match exactly pattern="/" component={Home} />
					<Match exactly pattern="/settings" component={Settings} />
					
					<Miss render={() => (
						<Redirect to="/" />
					)} />
				</div>
			</div>
		);
	}
}

export default connect()(App);