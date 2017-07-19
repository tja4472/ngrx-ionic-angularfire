import { Action } from '@ngrx/store';

export const ANONYMOUS_AUTHENTICATION = '[Login] Anonymous Authentication';
export const ANONYMOUS_AUTHENTICATION_FAILURE = '[Login] Anonymous Authentication Failure';
export const CREATE_USER = '[Login] Create User';
export const CREATE_USER_FAILURE = '[Login] Create User Failure';
export const EMAIL_AUTHENTICATION = '[Login] Email Authentication';
export const EMAIL_AUTHENTICATION_FAILURE = '[Login] Email Authentication Failure';
export const GOOGLE_AUTHENTICATION = '[Login] Google Authentication';
export const GOOGLE_AUTHENTICATION_FAILURE = '[Login] Google Authentication Failure';
export const LOGOUT = '[Login] Logout';
export const RESTORE_AUTHENTICATION = '[Login] Restore Authentication';


export class AnonymousAuthenticationAction implements Action {
    readonly type = ANONYMOUS_AUTHENTICATION;

    constructor() { }
}

export class AnonymousAuthenticationFailureAction implements Action {
    readonly type = ANONYMOUS_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error
}

/*
export class AnonymousAuthenticationSuccessAction implements Action {
    type = ActionTypes.ANONYMOUS_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class CreateUserAction implements Action {
    readonly type = CREATE_USER;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class CreateUserFailureAction implements Action {
    readonly type = CREATE_USER_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class CreateUserSuccessAction implements Action {
    type = ActionTypes.CREATE_USER_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class EmailAuthenticationAction implements Action {
    readonly type = EMAIL_AUTHENTICATION;

    constructor(public payload: {
        userName: string,
        password: string
    }) { }
}

export class EmailAuthenticationFailureAction implements Action {
    readonly type = EMAIL_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class EmailAuthenticationSuccessAction implements Action {
    type = ActionTypes.EMAIL_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class GoogleAuthenticationAction implements Action {
    readonly type = GOOGLE_AUTHENTICATION;

    constructor() { }
}

export class GoogleAuthenticationFailureAction implements Action {
    readonly type = GOOGLE_AUTHENTICATION_FAILURE;

    constructor(public payload: any) { } // error 
}

/*
export class GoogleAuthenticationSuccessAction implements Action {
    type = ActionTypes.GOOGLE_AUTHENTICATION_SUCCESS;

    constructor(public payload: FirebaseAuthState) { }
}
*/

export class LogoutAction implements Action {
    readonly type = LOGOUT;

    constructor() { }
}

export class RestoreAuthenticationAction implements Action {
    readonly type = RESTORE_AUTHENTICATION;

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
