// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum LoginActionTypes {
  AnonymousAuthentication = '[Login] Anonymous Authentication',
  AnonymousAuthenticationFailure = '[Login] Anonymous Authentication Failure',
  // BeginAuthentication = '[Login] Begin Authentication',
  // ClearError = '[Login] Clear Error',
  // BeginAuthenticationFailure = '[Login] Begin Authentication Failure',
  CreateUser = '[Login] Create User',
  CreateUserFailure = '[Login] Create User Failure',
  EmailAuthentication = '[Login] Email Authentication',
  EmailAuthenticationFailure = '[Login] Email Authentication Failure',
  GoogleAuthentication = '[Login] Google Authentication',
  GoogleAuthenticationFailure = '[Login] Google Authentication Failure',
  LOGOUT = '[Login] Logout',
  LOGOUT_FAILURE = '[Login] Logout Failure',
  LOGOUT_SUCCESS = '[Login] Logout Success',
  RestoreAuthentication = '[Login] Restore Authentication',
}

/*
export const ANONYMOUS_AUTHENTICATION = '[Login] Anonymous Authentication';
export const ANONYMOUS_AUTHENTICATION_FAILURE =
  '[Login] Anonymous Authentication Failure';
export const CREATE_USER = '[Login] Create User';
export const CREATE_USER_FAILURE = '[Login] Create User Failure';
export const EMAIL_AUTHENTICATION = '[Login] Email Authentication';
export const EMAIL_AUTHENTICATION_FAILURE =
  '[Login] Email Authentication Failure';
export const GOOGLE_AUTHENTICATION = '[Login] Google Authentication';
export const GOOGLE_AUTHENTICATION_FAILURE =
  '[Login] Google Authentication Failure';
export const LOGOUT = '[Login] Logout';
export const RESTORE_AUTHENTICATION = '[Login] Restore Authentication';
*/

export class AnonymousAuthentication implements Action {
  public readonly type = LoginActionTypes.AnonymousAuthentication;
}

export class AnonymousAuthenticationFailure implements Action {
  public readonly type = LoginActionTypes.AnonymousAuthenticationFailure;

  constructor(public payload: any) {} // error
}

/*
export class AnonymousAuthenticationSuccessAction implements Action {
    type = ActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class CreateUser implements Action {
  public readonly type = LoginActionTypes.CreateUser;

  constructor(
    public payload: {
      userName: string;
      password: string;
    },
  ) {}
}

export class CreateUserFailure implements Action {
  public readonly type = LoginActionTypes.CreateUserFailure;

  constructor(public payload: any) {} // error
}

/*
export class CreateUserSuccessAction implements Action {
    type = ActionTypes.CREATE_USER_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class EmailAuthentication implements Action {
  public readonly type = LoginActionTypes.EmailAuthentication;

  constructor(
    public payload: {
      userName: string;
      password: string;
    },
  ) {}
}

export class EmailAuthenticationFailure implements Action {
  public readonly type = LoginActionTypes.EmailAuthenticationFailure;

  constructor(public payload: any) {} // error
}

/*
export class EmailAuthenticationSuccessAction implements Action {
    type = ActionTypes.EMAIL_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class GoogleAuthentication implements Action {
  public readonly type = LoginActionTypes.GoogleAuthentication;
}

export class GoogleAuthenticationFailure implements Action {
  public readonly type = LoginActionTypes.GoogleAuthenticationFailure;

  constructor(public payload: any) {} // error
}

/*
export class GoogleAuthenticationSuccessAction implements Action {
    type = ActionTypes.GOOGLE_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class Logout implements Action {
  public readonly type = LoginActionTypes.LOGOUT;
}

export class LogoutFailure implements Action {
  public readonly type = LoginActionTypes.LOGOUT_FAILURE;

  constructor(public payload: any) {}
}

export class LogoutSuccess implements Action {
  public readonly type = LoginActionTypes.LOGOUT_SUCCESS;
}

export class RestoreAuthentication implements Action {
  public readonly type = LoginActionTypes.RestoreAuthentication;

  constructor(
    public payload: {
      isAnonymous: boolean;
      displayName: string | null;
      email: string | null;
    },
  ) {}
}

export type LoginActions =
  | AnonymousAuthentication
  | AnonymousAuthenticationFailure
  // AnonymousAuthenticationSuccessAction |
  | CreateUser
  | CreateUserFailure
  // CreateUserSuccessAction |
  | EmailAuthentication
  | EmailAuthenticationFailure
  // EmailAuthenticationSuccessAction |
  | GoogleAuthentication
  | GoogleAuthenticationFailure
  // GoogleAuthenticationSuccessAction |
  | Logout
  | LogoutFailure
  | LogoutSuccess
  | RestoreAuthentication;
