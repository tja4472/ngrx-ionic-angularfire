import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAuth from '../app/auth/auth.reducer';
import * as fromGadget from '../gadget/gadget.reducer';
import * as fromGizmo from '../gizmo/gizmo.reducer';
import * as fromWidget from '../widget/widget.reducer';
import * as fromCollection from './collection';

export interface State {
  collection: fromCollection.State;
  auth: fromAuth.State;
  gadget: fromGadget.State;
  gizmo: fromGizmo.State;
  widget: fromWidget.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  collection: fromCollection.reducer,
  gadget: fromGadget.reducer,
  gizmo: fromGizmo.reducer,
  widget: fromWidget.reducer,
};

export const metaReducers: Array<MetaReducer<State>> = [storeFreeze];

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
export const getCollectionState = (state: State) => state.collection;

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
export const getAuthState = (state: State) => state.auth;

export const getAuthDisplayName = createSelector(
  getAuthState,
  fromAuth.getDisplayName,
);
export const getAuthError = createSelector(getAuthState, fromAuth.getError);
export const getAuthIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated,
);
export const getAuthIsAuthenticating = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticating,
);
//
export const getGizmoState = (state: State) => state.gizmo;

export const getGizmoLoaded = createSelector(
  getGizmoState,
  fromGizmo.getLoaded,
);
export const getGizmoLoading = createSelector(
  getGizmoState,
  fromGizmo.getLoading,
);

export const selectGizmoIds = createSelector(
  getGizmoState,
  fromGizmo.selectGizmoIds,
);
export const selectGizmoEntities = createSelector(
  getGizmoState,
  fromGizmo.selectGizmoEntities,
);
export const selectAllGizmos = createSelector(
  getGizmoState,
  fromGizmo.selectAllGizmos,
);
export const selectGizmoTotal = createSelector(
  getGizmoState,
  fromGizmo.selectGizmoTotal,
);
export const selectCurrentGizmoId = createSelector(
  getGizmoState,
  fromGizmo.getSelectedGizmoId,
);

export const selectCurrentGizmo = createSelector(
  selectGizmoEntities,
  selectCurrentGizmoId,
  (gizmoEntities, gizmoId) => gizmoEntities[gizmoId],
);
//
export const getWidgetState = (state: State) => state.widget;

export const getWidgetLoaded = createSelector(
  getWidgetState,
  fromWidget.getLoaded,
);
export const getWidgetLoading = createSelector(
  getWidgetState,
  fromWidget.getLoading,
);

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
//#region Gadget selectors
export const getGadgetState = (state: State) => state.gadget;

export const getGadgetLoaded = createSelector(
  getGadgetState,
  fromGadget.getLoaded,
);
export const getGadgetLoading = createSelector(
  getGadgetState,
  fromGadget.getLoading,
);

export const selectGadgetIds = createSelector(
  getGadgetState,
  fromGadget.selectGadgetIds,
);
export const selectGadgetEntities = createSelector(
  getGadgetState,
  fromGadget.selectGadgetEntities,
);
export const selectAllGadgets = createSelector(
  getGadgetState,
  fromGadget.selectAllGadgets,
);
export const selectGadgetTotal = createSelector(
  getGadgetState,
  fromGadget.selectGadgetTotal,
);
export const selectCurrentGadgetId = createSelector(
  getGadgetState,
  fromGadget.getSelectedGadgetId,
);

export const selectCurrentGadget = createSelector(
  selectGadgetEntities,
  selectCurrentGadgetId,
  (widgetEntities, widgetId) => widgetEntities[widgetId],
);
//#endregion
