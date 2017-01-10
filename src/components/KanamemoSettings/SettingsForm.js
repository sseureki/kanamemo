
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/kanamemoSettings';

const Checkbox = ({ checked, children, handleChange }) => {
	return (
		<div className="form-check">
			<label className="form-check-label">
				<input className="form-check-input" type="checkbox" 
					checked={checked} onChange={handleChange} />
				{' ' + children}
			</label>
		</div>
	);
};

const Range = ({ enabled, level, handleChange }) => {
	return (
		<div className={`form-group row${!enabled ? ' text-muter' : ''}`}>
			<label className="col-4 col-md-4 text-center">Level: {level}</label>
			<div className="col-8 col-md-8">
				<input type="range" min={1} max={26} step={1} disabled={!enabled}
					value={level} onChange={handleChange} />
			</div>
		</div>
	);
};

class SettingsForm extends Component {
	handleToggleAutoInput = (e) => {
		this.props.toggleAutoInput(e.currentTarget.checked);
	};
	handleToggleAutoLevelUp = (e) => {
		this.props.toggleAutoLevelUp(e.currentTarget.checked);
	};
	handleToggleHiragana = (e) => {
		this.props.toggleHiragana(e.currentTarget.checked);
	};
	handleToggleKatakana = (e) => {
		this.props.toggleKatakana(e.currentTarget.checked);
	};
	handleChangeHiragana = (e) => {
		this.props.changeHiragana(
			parseInt(e.currentTarget.value, 10)
		);
	};
	handleChangeKatakana = (e) => {
		this.props.changeKatakana(
			parseInt(e.currentTarget.value, 10)
		);
	};
	
	render(){
		const { isAutoInput, isAutoLevelUp, hiraganaEnabled, 
					katakanaEnabled, hiraganaLevel, katakanaLevel } = this.props;
		
		return (
			<div>
				<Checkbox checked={isAutoInput} 
					handleChange={this.handleToggleAutoInput}>Auto Input</Checkbox>
					
				<Checkbox checked={isAutoLevelUp} 
					handleChange={this.handleToggleAutoLevelUp}>Auto Level Up</Checkbox>
				
				<Checkbox checked={hiraganaEnabled} 
								handleChange={this.handleToggleHiragana}>Hiragana</Checkbox>
								
				<Range enabled={hiraganaEnabled} 
							level={hiraganaLevel} 
							handleChange={this.handleChangeHiragana} />
				
				<Checkbox checked={katakanaEnabled} 
				
								handleChange={this.handleToggleKatakana}>Katakana</Checkbox>
				<Range enabled={katakanaEnabled} 
							level={katakanaLevel} 
							handleChange={this.handleChangeKatakana} />
			</div>
		);
	}
}

const mapStateToProps = ({ 
	kanamemo: { settings: { isAutoInput, isAutoLevelUp, hiragana, katakana } } 
}) => ({
	isAutoInput,
	isAutoLevelUp,
	hiraganaEnabled: hiragana.enabled,
	katakanaEnabled: katakana.enabled,
	hiraganaLevel: hiragana.level,
	katakanaLevel: katakana.level,
});

export default connect(mapStateToProps, actions)(SettingsForm);