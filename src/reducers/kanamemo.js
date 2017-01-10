
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from 'constants/actionTypes';

const currentKana = (state = { 
	text: '', 
	romaji: '',
	tableName: ''
}, action) => {
	switch(action.type){
		case types.KANAMEMO_GET_NEXT_KANA:
			return action.nextKana;
			
		case types.KANAMEMO_SETTINGS_RESET:
			return {
				text: '', 
				romaji: '',
				tableName: ''
			};
		
		default:
			return state;
	}
};

const previousKana = (state = { 
	text: '', 
	romaji: '',
	tableName: '',
	isCorrect: false
}, action) => {
	switch(action.type){
		case types.KANAMEMO_FORM_SUBMIT:
			return action.previousKana;
			
		case types.KANAMEMO_SETTINGS_RESET:
			return {
				text: '', 
				romaji: '',
				tableName: '',
				isCorrect: false
			};
		
		default:
			return state;
	}
};

const scores = (state = {}, action) => {
	switch(action.type){
		case types.KANAMEMO_FORM_SUBMIT:
			const kanaText = action.previousKana.text;
			
			return kanaText.length > 0 ? {
				...state,
				[kanaText]: action.score
			} : state;
			
		case types.KANAMEMO_SETTINGS_RESET:
			return {};
		
		default:
			return state;
	}
};

const userInput = (state = '', action) => {
	switch(action.type){
		case types.KANAMEMO_INPUT_CHANGE:
			return action.text;
		
		case types.KANAMEMO_GET_NEXT_KANA:
		case types.KANAMEMO_SETTINGS_RESET:
			return '';
			
		default:
			return state;
	}
};

const noticeInitialState = {
	isShow: false,
	isCorrect: false,
	isLevelUp: false,
	isShowHint: false
};

const notice = (state = noticeInitialState, action) => {
	switch(action.type){
		case types.KANAMEMO_FORM_SUBMIT:
			return action.notice.isShowHint ? noticeInitialState : action.notice;
			
		case types.KANAMEMO_SHOW_HINT:
			return {
				...state,
				isShow: true,
				isShowHint: true
			};
		
		case types.KANAMEMO_SETTINGS_RESET:
			return noticeInitialState;
			
		case LOCATION_CHANGE:
			return action.payload.location.pathname !== '/' ? noticeInitialState : state;

		default:
			return state;
	}
};

const hiraganaInitialState = {
	enabled: true,
	level: 1
};

const hiragana = (state = hiraganaInitialState, action) => {
	switch(action.type){
		case types.KANAMEMO_LEVEL_UP:
			return action.tableName === 'hiragana' ? {
				enabled: state.enabled,
				level: action.level
			} : state;
			
		case types.KANAMEMO_HIRAGANA_TOGGLE:
			return {
				enabled: action.checked,
				level: state.level
			};
			
		case types.KANAMEMO_HIRAGANA_LEVEL_CHANGE:
			return {
				enabled: state.enabled,
				level: action.level
			};
			
		case types.KANAMEMO_SETTINGS_RESET:
			return hiraganaInitialState;
		
		default:
			return state;
	}
};

const katakanaInitialState = {
	enabled: false,
	level: 1
};

const katakana = (state = katakanaInitialState, action) => {
	switch(action.type){
		case types.KANAMEMO_LEVEL_UP:
			return action.tableName === 'katakana' ? {
				enabled: state.enabled,
				level: action.level
			} : state;
			
		case types.KANAMEMO_KATAKANA_TOGGLE:
			return {
				enabled: action.checked,
				level: state.level
			};
			
		case types.KANAMEMO_KATAKANA_LEVEL_CHANGE:
			return {
				enabled: state.enabled,
				level: action.level
			};
			
		case types.KANAMEMO_SETTINGS_RESET:
			return katakanaInitialState;
		
		default:
			return state;
	}
};

const isAutoInput = (state = true, action) => {
	switch(action.type){
		case types.KANAMEMO_AUTO_INPUT_TOGGLE:
			return action.checked;
			
		case types.KANAMEMO_SETTINGS_RESET:
			return true;
		
		default:
			return state;
	}
};

const isAutoLevelUp = (state = true, action) => {
	switch(action.type){
		case types.KANAMEMO_AUTO_LEVEL_UP_TOGGLE:
			return action.checked;
		
		case types.KANAMEMO_SETTINGS_RESET:
			return true;
			
		default:
			return state;
	}
};

const settings = combineReducers({
	isAutoInput,
	isAutoLevelUp,
	hiragana,
	katakana
});

export const kanamemo = combineReducers({
	settings,
	scores,
	currentKana,
	previousKana,
	notice,
	userInput
});