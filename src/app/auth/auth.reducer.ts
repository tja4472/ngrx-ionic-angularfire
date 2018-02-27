import { AuthActions, AuthActionTypes } from './auth.action';

export interface State {
  displayName: string;
  email: string | null;
  emailVerified: boolean;
  hasChecked: boolean;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error: any;
  userId: string;
}

const initialState: State = {
  displayName: '',
  email: '',
  emailVerified: false,
  error: null,
  hasChecked: false,
  isAuthenticated: false,
  isAuthenticating: false,
  userId: '',
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LISTEN_FOR_AUTH_SUCCESS: {
      return {
        ...state,
        displayName: makeDisplayName(action.payload.signedInUser),
        email: action.payload.signedInUser.email,
        emailVerified: action.payload.signedInUser.emailVerified,
        hasChecked: true,
        isAuthenticated: true,
        isAuthenticating: false,
        userId: action.payload.signedInUser.userId,
      };
    }

    case AuthActionTypes.LISTEN_FOR_AUTH_NO_USER: {
      return {
        ...state,
        displayName: 'Not Signed In',
        email: '',
        hasChecked: true,
        isAuthenticated: false,
        isAuthenticating: false,
        userId: '',
      };
    }
    case AuthActionTypes.CreateUser:
    case AuthActionTypes.EMAIL_AUTHENTICATION: {
      return {
        ...state,
        error: null,
        isAuthenticating: true,
      };
    }

    case AuthActionTypes.EMAIL_AUTHENTICATION_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isAuthenticating: false,
      };
    }

    case AuthActionTypes.CreateUserFailure: {
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
  displayName: string | null;
  email: string | null;
  userId: string;
}) {
  //
  const defaultDisplayName = '';

  if (user.displayName) {
    return user.displayName;
  }

  if (user.email) {
    return user.email;
  }
  return defaultDisplayName;
}

export const getDisplayName = (state: State) => state.displayName;
export const getEmailVerified = (state: State) => state.emailVerified;
export const getError = (state: State) => state.error;
export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getIsAuthenticating = (state: State) => state.isAuthenticating;
export const getUserId = (state: State) => state.userId;
