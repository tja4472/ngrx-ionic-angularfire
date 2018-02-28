import { AuthActions, AuthActionTypes } from './auth.action';

export interface AuthState {
  displayName: string;
  email: string | null;
  emailVerified: boolean;
  hasChecked: boolean;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error: any;
  userId: string;
}

const initialState: AuthState = {
  displayName: '',
  email: '',
  emailVerified: false,
  error: null,
  hasChecked: false,
  isAuthenticated: false,
  isAuthenticating: false,
  userId: '',
};

export function reducer(state = initialState, action: AuthActions): AuthState {
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
    case AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD:
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

    case AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD_FAILURE: {
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

export const getDisplayName = (state: AuthState) => state.displayName;
export const getEmailVerified = (state: AuthState) => state.emailVerified;
export const getError = (state: AuthState) => state.error;
export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const getIsAuthenticating = (state: AuthState) => state.isAuthenticating;
export const getUserId = (state: AuthState) => state.userId;
