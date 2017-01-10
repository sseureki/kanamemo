
import React, { Component, PropTypes } from 'react';

class NoticeText extends Component {
	messageStyle = () => {
		const { isShow, isCorrect, isLevelUp, isShowHint } = this.props;
		const className = 'card-block pt-3 pb-1 h5 text-center';
		
		if(isShow){
			if(isShowHint){
				return `${className} text-muted`;
			}
			
			if(isLevelUp || isCorrect){
				return `${className} text-success`;
			} else {
				return `${className} text-danger`;
			}
		}

		return className;
	};
	
	messageText = () => {
		const { isShow, isCorrect, isLevelUp, isShowHint, currentKana, previousKana } = this.props;
		
		if(isShow){
			if(isShowHint){
				return `Hint: "${currentKana.text}" is "${currentKana.romaji}".`;
			}
			
			if(isLevelUp){
				return `Level up on ${previousKana.tableName}!`;
			} else {
				return `${isCorrect ? 'Correct!' : 'Wrong!'} "${previousKana.text}" is "${previousKana.romaji}"!`;
			}
		}
		
		return '\u00A0';
	};
	
	render(){
		return (
			<div className={this.messageStyle()}>
				{this.messageText()}
			</div>
		);
	}
	
	static propTypes = {
		isShow: PropTypes.bool, 
		isCorrect: PropTypes.bool, 
		isLevelUp: PropTypes.bool
	};
}

export default NoticeText;