import { createSelector } from '@ngrx/store';

import * as FromRootReducer from '../../reducers';
import * as fromAuth from './auth.reducer';

export const getAuthState = (state: FromRootReducer.State) => state.auth;

export const getDisplayName = createSelector(
  getAuthState,
  fromAuth.getDisplayName,
);

export const getError = createSelector(getAuthState, fromAuth.getError);

export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated,
);

export const getIsAuthenticating = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticating,
);

export const getUserId = createSelector(getAuthState, fromAuth.getUserId);
