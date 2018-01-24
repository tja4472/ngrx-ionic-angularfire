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
    case LoginActionTypes.CHECK_AUTH_SUCCESS: {
      return {
        ...state,
        displayName: makeDisplayName(action.payload),
        hasChecked: true,
        isAuthenticated: true,
        isAuthenticating: false,
      };
    }

    case LoginActionTypes.CHECK_AUTH_NO_USER: {
      return {
        ...state,
        displayName: '',
        hasChecked: true,
        isAuthenticated: false,
        isAuthenticating: false,
      };
    }
    case LoginActionTypes.CreateUser:
    case LoginActionTypes.EMAIL_AUTHENTICATION: {
      return {
        ...state,
        error: null,
        isAuthenticating: true,
      };
    }

    case LoginActionTypes.EMAIL_AUTHENTICATION_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isAuthenticating: false,
      };
    }

    case LoginActionTypes.CreateUserFailure: {
      return {
        ...state,
        error: action.payload,
        isAuthenticating: false,
      };
    }

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
