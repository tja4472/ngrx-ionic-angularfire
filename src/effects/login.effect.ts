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

  // https://gitter.im/ngrx/store?at=57f1bf01b0ff456d3adca786
  // But this link gives typescript promise errors.
  // tslint:disable-next-line:member-ordering
  /*
  @Effect({ dispatch: false })
  public anonymousAuthentication$ = this.actions$
    .ofType(LoginActionTypes.AnonymousAuthentication)
    .map(() =>
      this.auth$.auth
        .signInAnonymously()
        .then((user) =>
          this.state$.dispatch(
            new CheckAuthSuccess({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            }),
          ),
        )
        .catch((error) =>
          this.state$.dispatch(new AnonymousAuthenticationFailure(error)),
        ),
    );
*/
  /*
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public createUser$ = this.actions$
    .ofType(LoginActionTypes.CreateUser)
    // .do(x => console.log('login.effect:createUser>', x))
    .map((action: CreateUser) => action.payload)
    .map((payload) => {
      this.auth$.auth
        .createUserWithEmailAndPassword(payload.userName, payload.password)
        .then((user) =>
          this.state$.dispatch(
            new CheckAuthSuccess({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            }),
          ),
        )
        .catch((error) => this.state$.dispatch(new CreateUserFailure(error)));
    });
*/
  /*
  // tslint:disable-next-line:member-ordering
  @Effect()
  public logout$ = this.actions$
    .ofType(LoginActionTypes.LOGOUT)
    .switchMap(() => this.auth$.auth.signOut())
    .map((res: any) => new LogoutSuccess())
    .catch((error: any) => Observable.of(new LogoutFailure(error)));
*/

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

  /***** Working *****/
  // tslint:disable-next-line:member-ordering
  /*
  @Effect({ dispatch: false })
  public emailAuthentication$ = this.actions$
    .ofType(LoginActionTypes.EmailAuthentication)
    .map((action: EmailAuthentication) => action.payload)
    .switchMap((payload) =>
      this.auth$.auth
        .signInWithEmailAndPassword(payload.userName, payload.password)
        .catch((error: any) =>
          this.state$.dispatch(new EmailAuthenticationFailure(error)),
        ),
    );
  */
  /***** Working
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public emailAuthentication$ = this.actions$
    .ofType(LoginActionTypes.EmailAuthentication)
    .map((action: EmailAuthentication) => action.payload)
    .switchMap((payload) => {
      console.log('signInWithEmailAndPassword>');
      this.auth$.auth
        .signInWithEmailAndPassword(payload.userName, payload.password)
        .catch((error: any) =>
          this.state$.dispatch(new EmailAuthenticationFailure(error)),
        );
      return empty();
    });
  *****/
}
