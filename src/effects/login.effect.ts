import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Actions, Effect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Observable } from 'rxjs';

import {
  CheckAuthFailure,
  CheckAuthNoUser,
  CheckAuthSuccess,
  EmailAuthentication,
  EmailAuthenticationFailure,
  EmailAuthenticationSuccess,
  LoginActionTypes,
  SignOutFailure,
  SignOutSuccess,
} from '../actions/login.action';
import { AuthService } from '../app/auth/auth.service';

@Injectable()
export class LoginEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  public checkAuth$ = this.actions$.ofType(ROOT_EFFECTS_INIT).switchMap(() =>
    this.authService
      .authState$()
      .map((firebaseUser) => {
        if (firebaseUser) {
          return new CheckAuthSuccess({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            isAnonymous: firebaseUser.isAnonymous,
          });
        } else {
          return new CheckAuthNoUser();
        }
      })
      .catch((error: any) => Observable.of(new CheckAuthFailure(error))),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public signOut$ = this.actions$
    .ofType(LoginActionTypes.SIGN_OUT)
    .switchMap(() =>
      this.authService
        .signOut()
        .map((res: any) => new SignOutSuccess())
        .catch((error: any) => Observable.of(new SignOutFailure(error))),
    );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public emailAuthentication$ = this.actions$
    .ofType(LoginActionTypes.EMAIL_AUTHENTICATION)
    .map((action: EmailAuthentication) => action.payload)
    .switchMap((payload) =>
      this.authService
        .signInWithEmailAndPassword(payload.userName, payload.password)
        .map(() => new EmailAuthenticationSuccess())
        .catch((error: any) =>
          Observable.of(new EmailAuthenticationFailure({ error })),
        ),
    );
}
