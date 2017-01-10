
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/kanamemo';

class Footer extends Component {
	render(){
		const { showHint, submitButton } = this.props;
		
		return (
			<div className="card-footer">
				<div className="row">
					<div className="col-5 col-sm-4">
						<button type="button" className="btn btn-secondary btn-block" onClick={showHint}>
							<i className="fa fa-question fa-lg" aria-hidden="true" />
						</button>
					</div>
					<div className="col-5 offset-2 col-sm-4 offset-sm-4">
						<button type="button" className="btn btn-secondary btn-block" onClick={submitButton}>
							<i className="fa fa-terminal fa-lg" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		);
	}
	
	static propTypes = {
		showHint: PropTypes.func,
		submitButton: PropTypes.func
	};
}

export default connect(state => state, actions)(Footer);