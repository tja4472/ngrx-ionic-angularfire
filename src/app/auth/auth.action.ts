// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  CreateUser = '[Auth] Create User',
  CreateUserFailure = '[Auth] Create User Failure',
  EMAIL_AUTHENTICATION = '[Auth] Email Authentication',
  EMAIL_AUTHENTICATION_FAILURE = '[Auth] Email Authentication Failure',
  EMAIL_AUTHENTICATION_SUCCESS = '[Auth] Email Authentication Success',
  LISTEN_FOR_AUTH = '[Auth] Listen For Auth',
  LISTEN_FOR_AUTH_FAILURE = '[Auth] Listen For Auth Failure',
  LISTEN_FOR_AUTH_NO_USER = '[Auth] Listen For Auth No User',
  LISTEN_FOR_AUTH_SUCCESS = '[Auth] Listen For Auth Success',
  SIGN_OUT = '[Auth] Sign Out',
  SIGN_OUT_FAILURE = '[Auth] Sign Out Failure',
  SIGN_OUT_SUCCESS = '[Auth] Sign Out Success',
}

export class CreateUser implements Action {
  public readonly type = AuthActionTypes.CreateUser;

  constructor(
    public payload: {
      userName: string;
      password: string;
    },
  ) {}
}

export class CreateUserFailure implements Action {
  public readonly type = AuthActionTypes.CreateUserFailure;

  constructor(public payload: any) {} // error
}

export class EmailAuthentication implements Action {
  public readonly type = AuthActionTypes.EMAIL_AUTHENTICATION;

  constructor(
    public payload: {
      userName: string;
      password: string;
    },
  ) {}
}

export class EmailAuthenticationFailure implements Action {
  public readonly type = AuthActionTypes.EMAIL_AUTHENTICATION_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class EmailAuthenticationSuccess implements Action {
  public readonly type = AuthActionTypes.EMAIL_AUTHENTICATION_SUCCESS;
}

export class ListenForAuth implements Action {
  public readonly type = AuthActionTypes.LISTEN_FOR_AUTH;
}

export class ListenForAuthFailure implements Action {
  public readonly type = AuthActionTypes.LISTEN_FOR_AUTH_FAILURE;

  constructor(public payload: any) {}
}

export class ListenForAuthNoUser implements Action {
  public readonly type = AuthActionTypes.LISTEN_FOR_AUTH_NO_USER;
}

export class ListenForAuthSuccess implements Action {
  public readonly type = AuthActionTypes.LISTEN_FOR_AUTH_SUCCESS;

  constructor(
    public payload: {
      signedInUser: {
        displayName: string | null;
        email: string | null;
        emailVerified: boolean;
        userId: string;
      };
    },
  ) {}
}

export class SignOut implements Action {
  public readonly type = AuthActionTypes.SIGN_OUT;
}

export class SignOutFailure implements Action {
  public readonly type = AuthActionTypes.SIGN_OUT_FAILURE;

  constructor(public payload: any) {}
}

export class SignOutSuccess implements Action {
  public readonly type = AuthActionTypes.SIGN_OUT_SUCCESS;
}

export type AuthActions =
  | ListenForAuth
  | ListenForAuthNoUser
  | ListenForAuthSuccess
  | CreateUser
  | CreateUserFailure
  // CreateUserSuccessAction |
  | EmailAuthentication
  | EmailAuthenticationFailure
  | EmailAuthenticationSuccess
  | SignOut
  | SignOutFailure
  | SignOutSuccess;
