
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Kanamemo from './Kanamemo';

class Home extends Component {
	render(){
		return (
			<div className="row align-items-center justify-content-center">
				<div className="col-sm-9 col-md-7 col-lg-5">
					<Kanamemo />
				</div>
			</div>
		);
	}
}

export default connect()(Home);
