
import * as types from 'constants/actionTypes';

export const toggleAutoInput = (checked) => ({
	type: types.KANAMEMO_AUTO_INPUT_TOGGLE,
	checked
});

export const toggleAutoLevelUp = (checked) => ({
	type: types.KANAMEMO_AUTO_LEVEL_UP_TOGGLE,
	checked
});

export const toggleHiragana = (checked) => ({
	type: types.KANAMEMO_HIRAGANA_TOGGLE,
	checked
});

export const toggleKatakana = (checked) => ({
	type: types.KANAMEMO_KATAKANA_TOGGLE,
	checked
});

export const changeHiragana = (level) => ({
	type: types.KANAMEMO_HIRAGANA_LEVEL_CHANGE,
	level
});

export const changeKatakana = (level) => ({
	type: types.KANAMEMO_KATAKANA_LEVEL_CHANGE,
	level
});

export const resetSettings = () => ({
	type: types.KANAMEMO_SETTINGS_RESET
});