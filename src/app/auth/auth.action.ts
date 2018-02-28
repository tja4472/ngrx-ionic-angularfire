// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  CREATE_USER_WITH_EMAIL_AND_PASSWORD = '[Auth] Create User With Email and Password',
  CREATE_USER_WITH_EMAIL_AND_PASSWORD_FAILURE = '[Auth] Create User With Email and Password Failure',
  CREATE_USER_WITH_EMAIL_AND_PASSWORD_SUCCESS = '[Auth] Create User With Email and Password Success',
  EMAIL_AUTHENTICATION = '[Auth] Email Authentication',
  EMAIL_AUTHENTICATION_FAILURE = '[Auth] Email Authentication Failure',
  EMAIL_AUTHENTICATION_SUCCESS = '[Auth] Email Authentication Success',
  LISTEN_FOR_AUTH = '[Auth] Listen For Auth',
  LISTEN_FOR_AUTH_FAILURE = '[Auth] Listen For Auth Failure',
  LISTEN_FOR_AUTH_NO_USER = '[Auth] Listen For Auth No User',
  LISTEN_FOR_AUTH_SUCCESS = '[Auth] Listen For Auth Success',
  SEND_EMAIL_VERIFICATION = '[Auth] Send Email Verification',
  SEND_EMAIL_VERIFICATION_FAILURE = '[Auth] Send Email Verification Failure',
  SEND_EMAIL_VERIFICATION_SUCCESS = '[Auth] Send Email Verification Success',
  SEND_PASSWORD_RESET_EMAIL = '[Auth] Send Password Reset Email',
  SEND_PASSWORD_RESET_EMAIL_FAILURE = '[Auth] Send Password Reset Email Failure',
  SEND_PASSWORD_RESET_EMAIL_SUCCESS = '[Auth] Send Password Reset Email Success',
  SIGN_OUT = '[Auth] Sign Out',
  SIGN_OUT_FAILURE = '[Auth] Sign Out Failure',
  SIGN_OUT_SUCCESS = '[Auth] Sign Out Success',
  UPDATE_PASSWORD = '[Auth] Update Password',
  UPDATE_PASSWORD_FAILURE = '[Auth] Update Password Failure',
  UPDATE_PASSWORD_SUCCESS = '[Auth] Update Password Success',
}

export class CreateUserWithEmailAndPassword implements Action {
  public readonly type = AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD;

  constructor(
    public payload: {
      email: string;
      password: string;
    },
  ) {}
}

export class CreateUserWithEmailAndPasswordFailure implements Action {
  public readonly type = AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class CreateUserWithEmailAndPasswordSuccess implements Action {
  public readonly type = AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD_SUCCESS;
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

export class SendEmailVerification implements Action {
  public readonly type = AuthActionTypes.SEND_EMAIL_VERIFICATION;
}

export class SendEmailVerificationFailure implements Action {
  public readonly type = AuthActionTypes.SEND_EMAIL_VERIFICATION_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class SendEmailVerificationSuccess implements Action {
  public readonly type = AuthActionTypes.SEND_EMAIL_VERIFICATION_SUCCESS;
}

export class SendPasswordResetEmail implements Action {
  public readonly type = AuthActionTypes.SEND_PASSWORD_RESET_EMAIL;

  constructor(public payload: { email: string }) {}
}

export class SendPasswordResetEmailFailure implements Action {
  public readonly type = AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class SendPasswordResetEmailSuccess implements Action {
  public readonly type = AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS;
}

export class SignOut implements Action {
  public readonly type = AuthActionTypes.SIGN_OUT;
}

export class SignOutFailure implements Action {
  public readonly type = AuthActionTypes.SIGN_OUT_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class SignOutSuccess implements Action {
  public readonly type = AuthActionTypes.SIGN_OUT_SUCCESS;
}

export class UpdatePassword implements Action {
  public readonly type = AuthActionTypes.UPDATE_PASSWORD;

  constructor(public payload: { password: string }) {}
}

export class UpdatePasswordFailure implements Action {
  public readonly type = AuthActionTypes.UPDATE_PASSWORD_FAILURE;

  constructor(public payload: { error: any }) {}
}

export class UpdatePasswordSuccess implements Action {
  public readonly type = AuthActionTypes.UPDATE_PASSWORD_SUCCESS;
}

export type AuthActions =
  | ListenForAuth
  | ListenForAuthNoUser
  | ListenForAuthSuccess
  | CreateUserWithEmailAndPassword
  | CreateUserWithEmailAndPasswordFailure
  // CreateUserSuccessAction |
  | EmailAuthentication
  | EmailAuthenticationFailure
  | EmailAuthenticationSuccess
  | SignOut
  | SignOutFailure
  | SignOutSuccess;
