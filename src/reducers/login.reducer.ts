import * as loginActions from '../actions/login.action';

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

export function reducer(state = initialState, action: loginActions.Actions): State {
    switch (action.type) {
        case loginActions.GOOGLE_AUTHENTICATION: {
            return {
                ...state, 
                isAuthenticating: true
            };
        }

        // case loginAction.ActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS:
        // case loginAction.ActionTypes.CREATE_USER_SUCCESS:
        // case loginAction.ActionTypes.EMAIL_AUTHENTICATION_SUCCESS:
        // case loginAction.ActionTypes.GOOGLE_AUTHENTICATION_SUCCESS:
        case loginActions.RESTORE_AUTHENTICATION: {
            return {
                ...state, 
                displayName: makeDisplayName(action.payload),
                isAuthenticated: true,
                isAuthenticating: false
            };
        }

        case loginActions.LOGOUT: {
            return { 
                ...state, 
                displayName: '',
                isAuthenticated: false,
                isAuthenticating: false
            };
        }

        case loginActions.ANONYMOUS_AUTHENTICATION:
        case loginActions.CREATE_USER:
        case loginActions.EMAIL_AUTHENTICATION: {
            return {
                ...state, 
                error: null,
                isAuthenticating: true
            };
        }

        case loginActions.ANONYMOUS_AUTHENTICATION_FAILURE:
        case loginActions.CREATE_USER_FAILURE:
        case loginActions.EMAIL_AUTHENTICATION_FAILURE: {
            return {
                ...state, 
                error: action.payload,
                isAuthenticating: false
            };
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

function makeDisplayName(user: {
        isAnonymous: boolean;
        displayName: string,
        email: string,
    }) {
    if (user.isAnonymous) return 'Anonymous';

    if (user.displayName) return user.displayName;

    if (user.email) return user.email;
    return '';
}

export const getDisplayName = (state: State) => state.displayName;
export const getError = (state: State) => state.error;
export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getIsAuthenticating = (state: State) => state.isAuthenticating;
