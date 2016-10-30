import { Action } from '@ngrx/store';
import { type } from '../utils/util';

export const ActionTypes = {
    ANONYMOUS_AUTHENTICATION: type('[Login] Anonymous Authentication'),
    ANONYMOUS_AUTHENTICATION_FAILURE: type('[Login] Anonymous Authentication Failure'),
    // ANONYMOUS_AUTHENTICATION_SUCCESS: type('[Login] Anonymous Authentication Success'),
    CREATE_USER: type('[Login] Create User'),
    CREATE_USER_FAILURE: type('[Login] Create User Failure'),
    // CREATE_USER_SUCCESS: type('[Login] Create User Success'),
    EMAIL_AUTHENTICATION: type('[Login] Email Authentication'),
    EMAIL_AUTHENTICATION_FAILURE: type('[Login] Email Authentication Failure'),
    // EMAIL_AUTHENTICATION_SUCCESS: type('[Login] Email Authentication Success'),
    GOOGLE_AUTHENTICATION: type('[Login] Google Authentication'),
    GOOGLE_AUTHENTICATION_FAILURE: type('[Login] Google Authentication Failure'),
    // GOOGLE_AUTHENTICATION_SUCCESS: type('[Login] Google Authentication Success'),
    LOGOUT: type('[Login] Logout'),
    RESTORE_AUTHENTICATION: type('[Login] Restore Authentication'),
};

export class AnonymousAuthenticationAction implements Action {
    type = ActionTypes.ANONYMOUS_AUTHENTICATION;

    constructor() { }
}

export class AnonymousAuthenticationFailureAction implements Action {
    type = ActionTypes.ANONYMOUS_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

/*
export class AnonymousAuthenticationSuccessAction implements Action {
    type = ActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class CreateUserAction implements Action {
    type = ActionTypes.CREATE_USER;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class CreateUserFailureAction implements Action {
    type = ActionTypes.CREATE_USER_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class CreateUserSuccessAction implements Action {
    type = ActionTypes.CREATE_USER_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class EmailAuthenticationAction implements Action {
    type = ActionTypes.EMAIL_AUTHENTICATION;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class EmailAuthenticationFailureAction implements Action {
    type = ActionTypes.EMAIL_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class EmailAuthenticationSuccessAction implements Action {
    type = ActionTypes.EMAIL_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class GoogleAuthenticationAction implements Action {
    type = ActionTypes.GOOGLE_AUTHENTICATION;

    constructor() { }
}

export class GoogleAuthenticationFailureAction implements Action {
    type = ActionTypes.GOOGLE_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class GoogleAuthenticationSuccessAction implements Action {
    type = ActionTypes.GOOGLE_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class LogoutAction implements Action {
    type = ActionTypes.LOGOUT;

    constructor() { }
}

export class RestoreAuthenticationAction implements Action {
    type = ActionTypes.RESTORE_AUTHENTICATION;

    constructor(public payload: {
        isAnonymous: boolean;
        displayName: string,
        email: string,
    }) { }
}

export type Actions =
    AnonymousAuthenticationAction |
    AnonymousAuthenticationFailureAction |
    // AnonymousAuthenticationSuccessAction |
    CreateUserAction |
    CreateUserFailureAction |
    // CreateUserSuccessAction |
    EmailAuthenticationAction |
    EmailAuthenticationFailureAction |
    // EmailAuthenticationSuccessAction |
    GoogleAuthenticationAction |
    GoogleAuthenticationFailureAction |
    // GoogleAuthenticationSuccessAction |
    LogoutAction |
    RestoreAuthenticationAction;
