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
  EMAIL_AUTHENTICATION = '[Login] Email Authentication',
  EMAIL_AUTHENTICATION_FAILURE = '[Login] Email Authentication Failure',
  EMAIL_AUTHENTICATION_SUCCESS = '[Login] Email Authentication Success',
  GoogleAuthentication = '[Login] Google Authentication',
  GoogleAuthenticationFailure = '[Login] Google Authentication Failure',
  CHECK_AUTH_FAILURE = '[Login] Check Auth Failure',
  CHECK_AUTH_NO_USER = '[Login] Check Auth No User',
  CHECK_AUTH_SUCCESS = '[Login] Check Auth Success',
  SIGN_OUT = '[Login] Sign Out',
  SIGN_OUT_FAILURE = '[Login] Sign Out Failure',
  SIGN_OUT_SUCCESS = '[Login] Sign Out Success',
}

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
  public readonly type = LoginActionTypes.EMAIL_AUTHENTICATION;

  constructor(
    public payload: {
      userName: string;
      password: string;
    },
  ) {}
}

export class EmailAuthenticationFailure implements Action {
  public readonly type = LoginActionTypes.EMAIL_AUTHENTICATION_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class EmailAuthenticationSuccess implements Action {
  public readonly type = LoginActionTypes.EMAIL_AUTHENTICATION_SUCCESS;
}

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

export class SignOut implements Action {
  public readonly type = LoginActionTypes.SIGN_OUT;
}

export class SignOutFailure implements Action {
  public readonly type = LoginActionTypes.SIGN_OUT_FAILURE;

  constructor(public payload: any) {}
}

export class SignOutSuccess implements Action {
  public readonly type = LoginActionTypes.SIGN_OUT_SUCCESS;
}

export class CheckAuthFailure implements Action {
  public readonly type = LoginActionTypes.CHECK_AUTH_FAILURE;

  constructor(public payload: any) {}
}

export class CheckAuthNoUser implements Action {
  public readonly type = LoginActionTypes.CHECK_AUTH_NO_USER;
}

export class CheckAuthSuccess implements Action {
  public readonly type = LoginActionTypes.CHECK_AUTH_SUCCESS;

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
  | CheckAuthNoUser
  | CheckAuthSuccess
  | CreateUser
  | CreateUserFailure
  // CreateUserSuccessAction |
  | EmailAuthentication
  | EmailAuthenticationFailure
  | EmailAuthenticationSuccess
  | GoogleAuthentication
  | GoogleAuthenticationFailure
  // GoogleAuthenticationSuccessAction |
  | SignOut
  | SignOutFailure
  | SignOutSuccess;
