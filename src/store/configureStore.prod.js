
import { createHashHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import { KANAMEMO_LEVEL_UP, KANAMEMO_FORM_SUBMIT } from 'constants/actionTypes';
import { rootReducer, whitelistedKey } from 'reducers';

const history = createHashHistory({
	hashType: 'hashbang',
});

const configureStore = (initialState = {}) => {
	const storageEngine = filter(createEngine('kanamemo'), whitelistedKey);
	const storageReducer = storage.reducer(connectRouter(history)(rootReducer));
	const storageMiddleware = storage.createMiddleware(storageEngine, [], [
		KANAMEMO_LEVEL_UP, KANAMEMO_FORM_SUBMIT 
	]);
	const load = storage.createLoader(storageEngine);
	
	const store = createStore(
		storageReducer,
		initialState,
		applyMiddleware(
			routerMiddleware(history),
			thunkMiddleware,
			storageMiddleware
		)
	);

	load(store).catch(() => console.log('Failed to load previous state'));
	
	return { store, history };
};

export default configureStore;