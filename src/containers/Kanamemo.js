
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NoticeText, Input, StatusBar, Footer } from 'components/Kanamemo';
import { HiraganaProgress, KatakanaProgress } from 'components/Kanamemo/ProgressBar';
import * as actions from 'actions/kanamemo';
import * as fromList from 'reducers/createList';

class Kanamemo extends Component {
	componentDidMount(){
		this.props.getNextKana();
	}
	
	render(){
		const { text, notice, hiraganaExp, katakanaExp, hiragana, katakana } = this.props;
		
		return (
			<div className="card">
				<NoticeText {...notice} />
				
				<div className="card-block py-0 text-center kanamemo-size">{text}</div>
				<Input />
				
				<StatusBar hiragana={hiragana} katakana={katakana} />
				
				<HiraganaProgress enabled={hiragana.enabled} value={hiraganaExp} />
				<KatakanaProgress enabled={katakana.enabled} value={katakanaExp} />
				<Footer />
			</div>
		);
	}
	
	static propTypes = {
		hiragana: PropTypes.object,
		katakana: PropTypes.object,
		notice: PropTypes.object,
		hiraganaExp: PropTypes.number,
		katakanaExp: PropTypes.number,
		text: PropTypes.string
	};
}
const mapStateToProps = (score) => {
	const { kanamemo: { currentKana, previousKana, notice, scores, settings } } = score;
	const { hiragana, katakana } = settings;

	return {
		text: currentKana.text || '',
		hiraganaExp: fromList.getProgressValue(scores, hiragana.level, 'hiragana'),
		katakanaExp: fromList.getProgressValue(scores, katakana.level, 'katakana'),
		hiragana, 
		katakana,
		notice: {
			...notice,
			currentKana,
			previousKana
		}
	};
};

export default connect(mapStateToProps, actions)(Kanamemo);
