// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum LoginActionTypes {
  CHECK_AUTH_FAILURE = '[Login] Check Auth Failure',
  CHECK_AUTH_NO_USER = '[Login] Check Auth No User',
  CHECK_AUTH_SUCCESS = '[Login] Check Auth Success',
  CreateUser = '[Login] Create User',
  CreateUserFailure = '[Login] Create User Failure',
  EMAIL_AUTHENTICATION = '[Login] Email Authentication',
  EMAIL_AUTHENTICATION_FAILURE = '[Login] Email Authentication Failure',
  EMAIL_AUTHENTICATION_SUCCESS = '[Login] Email Authentication Success',
  SIGN_OUT = '[Login] Sign Out',
  SIGN_OUT_FAILURE = '[Login] Sign Out Failure',
  SIGN_OUT_SUCCESS = '[Login] Sign Out Success',
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

export type LoginActions =
  | CheckAuthNoUser
  | CheckAuthSuccess
  | CreateUser
  | CreateUserFailure
  // CreateUserSuccessAction |
  | EmailAuthentication
  | EmailAuthenticationFailure
  | EmailAuthenticationSuccess
  | SignOut
  | SignOutFailure
  | SignOutSuccess;
