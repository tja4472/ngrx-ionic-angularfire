// import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
// import { compose } from '@ngrx/core/compose';
// import { storeLogger } from 'ngrx-store-logger';
// import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, createSelector } from '@ngrx/store';

import * as fromCollection from './collection';
import * as fromLogin from './login.reducer';

export interface State {
  collection: fromCollection.State;
  login: fromLogin.State;
}

export const reducers = {
  collection: fromCollection.reducer,
  login: fromLogin.reducer
};

//const developmentReducer: ActionReducer<State> = compose(storeFreeze, storeLogger(), combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

/*
Don't know where PROD is set.

export function reducer(state: any, action: any) {
  if (PROD) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}
*/
/*export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}
*/
export const getCollectionState = (state: State) => state.collection;

export const getCollectionLoaded = createSelector(getCollectionState, fromCollection.getLoaded);
export const getCollectionLoading = createSelector(getCollectionState, fromCollection.getLoading);
export const getCollectionTextItems = createSelector(getCollectionState, fromCollection.getTextItems);
//
export const getLoginState = (state: State) => state.login;

export const getLoginDisplayName = createSelector(getLoginState, fromLogin.getDisplayName);
export const getLoginError = createSelector(getLoginState, fromLogin.getError);
export const getLoginIsAuthenticated = createSelector(getLoginState, fromLogin.getIsAuthenticated);
export const getLoginIsAuthenticating = createSelector(getLoginState, fromLogin.getIsAuthenticating);
