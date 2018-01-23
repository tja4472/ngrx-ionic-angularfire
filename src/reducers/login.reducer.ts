import { LoginActions, LoginActionTypes } from '../actions/login.action';

export interface State {
  displayName: string;
  hasChecked: boolean;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error: any;
}

const initialState: State = {
  displayName: '',
  error: null,
  hasChecked: false,
  isAuthenticated: false,
  isAuthenticating: false,
};

export function reducer(state = initialState, action: LoginActions): State {
  switch (action.type) {
    case LoginActionTypes.GoogleAuthentication: {
      return {
        ...state,
        isAuthenticating: true,
      };
    }

    // case loginAction.ActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS:
    // case loginAction.ActionTypes.CREATE_USER_SUCCESS:
    // case loginAction.ActionTypes.EMAIL_AUTHENTICATION_SUCCESS:
    // case loginAction.ActionTypes.GOOGLE_AUTHENTICATION_SUCCESS:
    case LoginActionTypes.RestoreAuthentication: {
      return {
        ...state,
        displayName: makeDisplayName(action.payload),
        hasChecked: true,
        isAuthenticated: true,
        isAuthenticating: false,
      };
    }

    case LoginActionTypes.LOGOUT: {
      return {
        ...state,
        displayName: '',
        isAuthenticated: false,
        isAuthenticating: false,
      };
    }

    case LoginActionTypes.AnonymousAuthentication:
    case LoginActionTypes.CreateUser:
    case LoginActionTypes.EmailAuthentication: {
      return {
        ...state,
        error: null,
        isAuthenticating: true,
      };
    }

    case LoginActionTypes.AnonymousAuthenticationFailure:
    case LoginActionTypes.CreateUserFailure:
    case LoginActionTypes.EmailAuthenticationFailure: {
      return {
        ...state,
        error: action.payload,
        isAuthenticating: false,
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
  displayName: string | null;
  email: string | null;
}) {
  if (user.isAnonymous) {
    return 'Anonymous';
  }

  if (user.displayName) {
    return user.displayName;
  }

  if (user.email) {
    return user.email;
  }
  return '';
}

export const getDisplayName = (state: State) => state.displayName;
export const getError = (state: State) => state.error;
export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getIsAuthenticating = (state: State) => state.isAuthenticating;
