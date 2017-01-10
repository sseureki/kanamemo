
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SettingsForm, Footer } from 'components/KanamemoSettings';
import * as actions from 'actions/kanamemoSettings';

class Settings extends Component {
	handleClick = () => {
		this.props.resetSettings();
	};
	
	render(){
		return (
			<div className="row align-items-center justify-content-center">
				<div className="col-sm-9 col-md-7 col-lg-5">
					<div className="card">
						<div className="card-block">
							<SettingsForm />
						</div>
						
						<Footer handleClick={this.handleClick } />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, actions)(Settings);