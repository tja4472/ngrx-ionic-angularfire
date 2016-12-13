import { Action } from '@ngrx/store';
import { type } from '../utils/util';

// Update action types definitions in order to work with typescript 2.1.4
// https://github.com/ngrx/example-app/pull/88
export const ActionTypes = new class {
    readonly ANONYMOUS_AUTHENTICATION = type('[Login] Anonymous Authentication');
    readonly ANONYMOUS_AUTHENTICATION_FAILURE = type('[Login] Anonymous Authentication Failure');
    readonly CREATE_USER = type('[Login] Create User');
    readonly CREATE_USER_FAILURE = type('[Login] Create User Failure');
    readonly EMAIL_AUTHENTICATION = type('[Login] Email Authentication');
    readonly EMAIL_AUTHENTICATION_FAILURE = type('[Login] Email Authentication Failure');
    readonly GOOGLE_AUTHENTICATION = type('[Login] Google Authentication');
    readonly GOOGLE_AUTHENTICATION_FAILURE = type('[Login] Google Authentication Failure');
    readonly LOGOUT = type('[Login] Logout');
    readonly RESTORE_AUTHENTICATION = type('[Login] Restore Authentication');
};

export class AnonymousAuthenticationAction implements Action {
    readonly type = ActionTypes.ANONYMOUS_AUTHENTICATION;

    constructor() { }
}

export class AnonymousAuthenticationFailureAction implements Action {
    readonly type = ActionTypes.ANONYMOUS_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

/*
export class AnonymousAuthenticationSuccessAction implements Action {
    type = ActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class CreateUserAction implements Action {
    readonly type = ActionTypes.CREATE_USER;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class CreateUserFailureAction implements Action {
    readonly type = ActionTypes.CREATE_USER_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class CreateUserSuccessAction implements Action {
    type = ActionTypes.CREATE_USER_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class EmailAuthenticationAction implements Action {
    readonly type = ActionTypes.EMAIL_AUTHENTICATION;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class EmailAuthenticationFailureAction implements Action {
    readonly type = ActionTypes.EMAIL_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class EmailAuthenticationSuccessAction implements Action {
    type = ActionTypes.EMAIL_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class GoogleAuthenticationAction implements Action {
    readonly type = ActionTypes.GOOGLE_AUTHENTICATION;

    constructor() { }
}

export class GoogleAuthenticationFailureAction implements Action {
    readonly type = ActionTypes.GOOGLE_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class GoogleAuthenticationSuccessAction implements Action {
    type = ActionTypes.GOOGLE_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;

    constructor() { }
}

export class RestoreAuthenticationAction implements Action {
    readonly type = ActionTypes.RESTORE_AUTHENTICATION;

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
