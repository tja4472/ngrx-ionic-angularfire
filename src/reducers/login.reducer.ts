import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
// import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LoginActions, LoginActionTypes } from '../actions/login.action';
import { FirebaseAuthState } from 'angularfire2';

import { assign } from '../utils';

export interface State {
    displayName: string;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: any;
};

const initialState: State = {
    displayName: '',
    isAuthenticated: false,
    isAuthenticating: false,
    error: null
};

export function reducer (state = initialState, action: LoginActions): State {
    switch (action.type) {
        case LoginActionTypes.GOOGLE_AUTHENTICATION : {
            return assign(state, {
                isAuthenticating: true
            });
        }

        case LoginActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS:
        case LoginActionTypes.CREATE_USER_SUCCESS:  
        case LoginActionTypes.EMAIL_AUTHENTICATION_SUCCESS:
        case LoginActionTypes.GOOGLE_AUTHENTICATION_SUCCESS:
        case LoginActionTypes.RESTORE_AUTHENTICATION: {
            let user: FirebaseAuthState = action.payload;

            return assign(state, {
                displayName: makeDisplayName(user),                
                isAuthenticated: true,
                isAuthenticating: false
            });
        }

        case LoginActionTypes.LOGOUT: {
            return assign(state, {
                displayName: '',
                isAuthenticated: false,
                isAuthenticating: false
            });
        }

        case LoginActionTypes.ANONYMOUS_AUTHENTICATION:
        case LoginActionTypes.CREATE_USER:        
        case LoginActionTypes.EMAIL_AUTHENTICATION: {
            return assign(state, {
                error: null,
                isAuthenticating: true
            });
        }

        case LoginActionTypes.ANONYMOUS_AUTHENTICATION_FAILURE:
        case LoginActionTypes.CREATE_USER_FAILURE:        
        case LoginActionTypes.EMAIL_AUTHENTICATION_FAILURE: {
            return assign(state, {
                error: action.payload,
                isAuthenticating: false
            }); 
        }

/*
        case LoginActions.ANONYMOUS_AUTHENTICATION_SUCCESS: {
            let user: FirebaseAuthState = action.payload;

            return Object.assign({}, state, {
                error: null,
                displayName: 'Anonymous',
                isAuthenticated: true,
                isAuthenticating: false
            });
        } 
*/
/*
        case LoginActions.CREATE_USER_SUCCESS:  
        case LoginActions.EMAIL_AUTHENTICATION_SUCCESS: {
            let user: FirebaseAuthState = action.payload;

            return Object.assign({}, state, {
                error: null,
                displayName: user.auth.email,
                isAuthenticated: true,
                isAuthenticating: false
            });
        }        
*/
        default: {
            return state;
        }
    }
}

function makeDisplayName(user: FirebaseAuthState) {
    if (user.auth.isAnonymous) return 'Anonymous';

    if (user.auth.displayName) return user.auth.displayName;

    if (user.auth.email) return user.auth.email;
    return '';
}

export function getDisplayName(state$: Observable<State>) {
  return state$.select(s => s.displayName);
}

export function getError(state$: Observable<State>) {
  return state$.select(s => s.error);
}

export function getIsAuthenticated(state$: Observable<State>) {
  return state$.select(s => s.isAuthenticated);
}

export function getIsAuthenticating(state$: Observable<State>) {
  return state$.select(s => s.isAuthenticating);
}
