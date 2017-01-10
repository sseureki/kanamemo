
import { getKanaListByLevel } from './kanaList';

const LEVEL_MIN_SCORE = 4;

export const getScore = (state, kana) => state[kana] || 0;
export const getScoreList = (state, kanaList, tableName) => 
	kanaList.map(kana => getScore(state, kana[tableName]));
	
export const getNewScoreByKana = (state, kana, isCorrect, isShowHint) => {
	let score = getScore(state, kana);
	
	if(isCorrect){
		if(++score > 10){ score = 10; }
	} else {
		if(isShowHint){ 
			score -= 2;
		} else {
			score -= 5;
		}
		
		if(score < 1){ score = 0; }
	}
	
	return score;
};

export const getProgressValue = (scores, level, tableName) => {
	const kanaList = getKanaListByLevel(level, level);
	const scoreList = getScoreList(scores, kanaList, tableName);

	const maxValue = kanaList.length * LEVEL_MIN_SCORE;
	const value = scoreList.reduce((prev, curr) => 
		(curr < LEVEL_MIN_SCORE ? prev + curr : prev + LEVEL_MIN_SCORE), 0);

	return value * 100 / maxValue;
};

export const isEmpty = (currentKana, text) => currentKana.romaji === '' && text === '';
export const isCorrect = (currentKana, text) => 
	!isEmpty(currentKana, text) && currentKana.romaji === text.toLowerCase();

export const isLevelUp = (isCorrect, state, tableName, level) => {
	if(level === 26 || !isCorrect){ return false; }
	
	const kanaList = getKanaListByLevel(level);
	const scoreList = getScoreList(state, kanaList, tableName);
	
	for(let score of scoreList){
		if(score < LEVEL_MIN_SCORE){
			return false;
		}
	}
	
	return true;
};

export const getLevel = (settings, tableName) => settings[tableName].level;
export const sum = (array) => array.reduce((prev, curr) => (prev + curr), 0);
export const getRandomInt = (max = 2, min = 0) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomKanaTable = ({ hiragana, katakana }) => {
	return !hiragana.enabled ? 'katakana' : 
			  !katakana.enabled ? 'hiragana' : ['hiragana', 'katakana'][getRandomInt(2)];
};

export const reverseScoreList = (state, kanaList, tableName) => {
	return kanaList.map(kana => {
		const key = kana[tableName];
		const score = getScore(state, key);
		let n = 10 - score;
		
		if(n < 1){ n = 1; }
		if(n > 10){ n = 10; }
		
		return n;
	});
};

const weightedChoiceSub = (weights) => {
	let random = Math.random() * sum(weights);
	
	for(let i = 0; i < weights.length; i++){
		random -= weights[i];
		
		if(random < 0){
			return i;
		}
	}
};
	
export const getRandomKanaFromList = (kanaList, weightsList) => 
	kanaList[weightedChoiceSub(weightsList)];

export const getRandomKana = (scores, previousKana, tableName, level) => {
	const kanaList = getKanaListByLevel(level);
	const weightsList = reverseScoreList(scores, kanaList, tableName);
	let kana = previousKana;

	do {
		kana = getRandomKanaFromList(kanaList, weightsList);
	} while(previousKana.romaji === kana.romaji);
	
	const currentKana = {
		text: kana[tableName],
		romaji: kana.romaji,
		tableName
	};
	
	return currentKana;
};