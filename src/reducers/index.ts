import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
//  error TS4023: Selector 
// tslint:disable-next-line:no-unused-variable
// import { share, Selector } from '../utils/util';

import * as fromCollection from './collection';
import * as fromLogin from './login.reducer';

//  error TS4023: Selector 
// tslint:disable-next-line:no-unused-variable
import { TextItem } from '../models/textitem';

export interface State {
  collection: fromCollection.State;
  login: fromLogin.State;
}

const reducers = {
  collection: fromCollection.reducer,
  login: fromLogin.reducer
};

const developmentReducer = compose(storeFreeze, storeLogger(), combineReducers)(reducers);
// const productionReducer = combineReducers(reducers);

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
export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

export function getCollectionState(state$: Observable<State>) {
  return state$.select(state => state.collection);
}

export const getCollectionLoaded = compose(fromCollection.getLoaded, getCollectionState);
export const getCollectionLoading = compose(fromCollection.getLoading, getCollectionState);
export const getCollectionTextItems = compose(fromCollection.getTextItems, getCollectionState);
//
export function getLoginState(state$: Observable<State>) {
  return state$.select(state => state.login);
}

export const getLoginDisplayName = compose(fromLogin.getDisplayName, getLoginState);
export const getLoginError = compose(fromLogin.getError, getLoginState);
export const getLoginIsAuthenticated = compose(fromLogin.getIsAuthenticated, getLoginState);
export const getLoginIsAuthenticating = compose(fromLogin.getIsAuthenticating, getLoginState);
