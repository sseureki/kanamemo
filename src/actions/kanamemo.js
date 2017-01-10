
import * as types from 'constants/actionTypes';
import * as fromList from 'reducers/createList';

export const levelUp = (tableName, level) => ({
	type: types.KANAMEMO_LEVEL_UP, 
	tableName, 
	level
});

export const getNextKana = () => (dispatch, getState) => {
	const { kanamemo: { currentKana, scores, settings } } = getState();
	const tableName = fromList.getRandomKanaTable(settings);
	const level = fromList.getLevel(settings, tableName);
	const nextKana = fromList.getRandomKana(scores, currentKana, tableName, level);
	
	dispatch({ type: types.KANAMEMO_GET_NEXT_KANA, nextKana });
};

export const submitForm = (text = '') => (dispatch, getState) => {
	const { kanamemo: { currentKana, notice: { isShowHint }, scores, settings } } = getState();
	
	let level = fromList.getLevel(settings, currentKana.tableName);
	const isEmpty = fromList.isEmpty(currentKana, text);
	const isCorrect = fromList.isCorrect(currentKana, text);
	const isLevelUp = fromList.isLevelUp(isCorrect, scores, currentKana.tableName, level);
	const score = fromList.getNewScoreByKana(scores, currentKana.text, isCorrect, isShowHint);
	
	dispatch({ 
		type: types.KANAMEMO_FORM_SUBMIT, 
		previousKana: { ...currentKana, isCorrect },
		score,
		notice: {
			isShow: !isEmpty,
			isCorrect,
			isLevelUp,
			isShowHint
		}
	});
	
	if(isLevelUp){
		dispatch(levelUp(currentKana.tableName, ++level));
	}
	
	dispatch(getNextKana());
};

export const submitButton = () => (dispatch, getState) => {
	const { kanamemo: { userInput } } = getState();
	
	dispatch(submitForm(userInput));
};

export const changeInput = (text = '') => (dispatch, getState) => {
	const { kanamemo: { currentKana: { romaji }, settings: { isAutoInput } } } = getState();
	
	dispatch({ type: types.KANAMEMO_INPUT_CHANGE, text });
	
	if(isAutoInput && text.length === romaji.length){
		dispatch(submitForm(text));
	}
};

export const showHint = () => ({
	type: types.KANAMEMO_SHOW_HINT
});