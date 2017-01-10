
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/kanamemo';

class Input extends Component {
	handleChange = (e) => {
		this.props.changeInput(e.currentTarget.value);
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		const { text, submitForm } = this.props;
		
		submitForm(text);
	};
	
	render(){
		return (
			<div className="card-block pt-3 pb-0">
				<div className="row">
					<div className="col-8 offset-2 col-md-6 offset-md-3">
						<form onSubmit={this.handleSubmit}>
							<input type="text" className="form-control" 
								ref={(input) => { this.input = input }}
								value={this.props.text} autoFocus={true} 
								onChange={this.handleChange} />
						</form>
					</div>
				</div>
			</div>
		);
	}
	
	static propTypes = {
		text: PropTypes.string
	};
}

const mapStateToProps = ({ kanamemo: { userInput } }) => {
	return { 
		text: userInput 
	};
};

export default connect(mapStateToProps, actions)(Input);