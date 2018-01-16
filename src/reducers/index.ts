// import { createSelector } from 'reselect';
// import { ActionReducer } from '@ngrx/store';
// import { compose } from '@ngrx/core/compose';
// import { storeLogger } from 'ngrx-store-logger';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromWidget from '../widget/widget.reducer';
import * as fromCollection from './collection';
import * as fromLogin from './login.reducer';

export interface IState {
  collection: fromCollection.IState;
  login: fromLogin.IState;
  widget: fromWidget.IState;
}

export const reducers: ActionReducerMap<IState> = {
  collection: fromCollection.reducer,
  login: fromLogin.reducer,
  widget: fromWidget.reducer,
};

export const metaReducers: Array<MetaReducer<IState>> = [storeFreeze];

// const developmentReducer: ActionReducer<State> = compose(storeFreeze, storeLogger(), combineReducers)(reducers);
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
export const getCollectionState = (state: IState) => state.collection;

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded,
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading,
);
export const getCollectionTextItems = createSelector(
  getCollectionState,
  fromCollection.getTextItems,
);
//
export const getLoginState = (state: IState) => state.login;

export const getLoginDisplayName = createSelector(
  getLoginState,
  fromLogin.getDisplayName,
);
export const getLoginError = createSelector(getLoginState, fromLogin.getError);
export const getLoginIsAuthenticated = createSelector(
  getLoginState,
  fromLogin.getIsAuthenticated,
);
export const getLoginIsAuthenticating = createSelector(
  getLoginState,
  fromLogin.getIsAuthenticating,
);
//
export const getWidgetState = (state: IState) => state.widget;

export const selectWidgetIds = createSelector(
  getWidgetState,
  fromWidget.selectWidgetIds,
);
export const selectWidgetEntities = createSelector(
  getWidgetState,
  fromWidget.selectWidgetEntities,
);
export const selectAllWidgets = createSelector(
  getWidgetState,
  fromWidget.selectAllWidgets,
);
export const selectWidgetTotal = createSelector(
  getWidgetState,
  fromWidget.selectWidgetTotal,
);
export const selectCurrentWidgetId = createSelector(
  getWidgetState,
  fromWidget.getSelectedWidgetId,
);

export const selectCurrentWidget = createSelector(
  selectWidgetEntities,
  selectCurrentWidgetId,
  (widgetEntities, widgetId) => widgetEntities[widgetId],
);
