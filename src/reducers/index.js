
import { combineReducers } from 'redux';
import { kanamemo } from './kanamemo';

export const rootReducer = combineReducers({
	kanamemo
});

export const whitelistedKey = [
	['kanamemo', 'settings'],
	['kanamemo', 'scores']
];