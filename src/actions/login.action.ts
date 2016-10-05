import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

import { label } from '../utils/util';

export const LoginActionTypes = {
    ANONYMOUS_AUTHENTICATION: label('[Login] Anonymous Authentication'),
    ANONYMOUS_AUTHENTICATION_FAILURE: label('[Login] Anonymous Authentication Failure'),
    ANONYMOUS_AUTHENTICATION_SUCCESS: label('[Login] Anonymous Authentication Success'),
    CREATE_USER: label('[Login] Create User'),
    CREATE_USER_FAILURE: label('[Login] Create User Failure'),
    CREATE_USER_SUCCESS: label('[Login] Create User Success'),
    EMAIL_AUTHENTICATION: label('[Login] Email Authentication'),
    EMAIL_AUTHENTICATION_FAILURE: label('[Login] Email Authentication Failure'),
    EMAIL_AUTHENTICATION_SUCCESS: label('[Login] Email Authentication Success'),
    GOOGLE_AUTHENTICATION: label('[Login] Google Authentication'),
    GOOGLE_AUTHENTICATION_FAILURE: label('[Login] Google Authentication Failure'),
    GOOGLE_AUTHENTICATION_SUCCESS: label('[Login] Google Authentication Success'),
    LOGOUT: label('[Login] Logout'),
    RESTORE_AUTHENTICATION: label('[Login] Restore Authentication'),
};

export class AnonymousAuthenticationAction implements Action {
    type = LoginActionTypes.ANONYMOUS_AUTHENTICATION;

    constructor() { }
}

export class AnonymousAuthenticationFailureAction implements Action {
    type = LoginActionTypes.ANONYMOUS_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

export class AnonymousAuthenticationSuccessAction implements Action {
    type = LoginActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}

export class CreateUserAction implements Action {
    type = LoginActionTypes.CREATE_USER;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class CreateUserFailureAction implements Action {
    type = LoginActionTypes.CREATE_USER_FAILURE;

    constructor(public payload: any) { } // error 
}

export class CreateUserSuccessAction implements Action {
    type = LoginActionTypes.CREATE_USER_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}

export class EmailAuthenticationAction implements Action {
    type = LoginActionTypes.EMAIL_AUTHENTICATION;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class EmailAuthenticationFailureAction implements Action {
    type = LoginActionTypes.EMAIL_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

export class EmailAuthenticationSuccessAction implements Action {
    type = LoginActionTypes.EMAIL_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}

export class GoogleAuthenticationAction implements Action {
    type = LoginActionTypes.GOOGLE_AUTHENTICATION;

    constructor() { }
}

export class GoogleAuthenticationFailureAction implements Action {
    type = LoginActionTypes.GOOGLE_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

export class GoogleAuthenticationSuccessAction implements Action {
    type = LoginActionTypes.GOOGLE_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}

export class LogoutAction implements Action {
    type = LoginActionTypes.LOGOUT;

    constructor() { }
}

export class RestoreAuthenticationAction implements Action {
    type = LoginActionTypes.RESTORE_AUTHENTICATION;

    constructor(public payload: FirebaseAuthState) { }
}

export type LoginActions =
    AnonymousAuthenticationAction |
    AnonymousAuthenticationFailureAction |
    AnonymousAuthenticationSuccessAction |
    CreateUserAction |
    CreateUserFailureAction |
    CreateUserSuccessAction |
    EmailAuthenticationAction |
    EmailAuthenticationFailureAction |
    EmailAuthenticationSuccessAction |
    GoogleAuthenticationAction |
    GoogleAuthenticationFailureAction |
    GoogleAuthenticationSuccessAction |
    LogoutAction |
    RestoreAuthenticationAction;
