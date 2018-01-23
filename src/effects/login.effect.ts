import { Observable } from 'rxjs';
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
import { empty } from 'rxjs/observable/empty';

import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { Actions, Effect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  AnonymousAuthenticationFailure,
  CreateUser,
  CreateUserFailure,
  EmailAuthentication,
  EmailAuthenticationFailure,
  LoginActionTypes,
  Logout,
  LogoutFailure,
  LogoutSuccess,
  RestoreAuthentication,
} from '../actions/login.action';
import { State } from '../reducers';

// error TS4029: https://github.com/Microsoft/TypeScript/issues/5938
// tslint:disable-next-line:no-unused-variable
// import { LoadCollectionSuccessAction, TextItemActionTypes } from '../actions/textitem.action';

// import * as loginActions from '../actions/login.action';

// import { TextItem } from '../models';
//
// Do not import from 'firebase' as you'd lose the tree shaking benefits

// AuthEffects

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<State>,
    public auth$: AngularFireAuth,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public checkAuth$ = this.actions$
    .ofType(ROOT_EFFECTS_INIT)
    // .ofType('@ngrx/effects/init')
    // .ofType('@ngrx/store/init')
    .do(() => console.log('checkAuth$'))
    .switchMap(() => this.auth$.authState)
    .map((firebaseUser) => {
      console.log('firebaseUser>', firebaseUser);
      if (firebaseUser) {
        console.log('firebaseUser.displayName>', firebaseUser.displayName);
        console.log('firebaseUser.email>', firebaseUser.email);
        return this.state$.dispatch(
          new RestoreAuthentication({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            isAnonymous: firebaseUser.isAnonymous,
          }),
        );
      } else {
        console.log('BAD');
        this.state$.dispatch(new Logout());
      }
    });

  /*
      @Effect() checkAuth$ = this.action$.ofType(actions.CHECK_AUTH)
        .do((action) => console.log(`Received ${action.type}`))
        .switchMap(() => this.auth$.authState)
        .map((_result) => {
            debugger
            if (_result) {
                console.log("in auth subscribe", _result)
                return { type: actions.CHECK_AUTH_SUCCESS, payload: _result }
            } else {
                console.log("in auth subscribe - no user", _result)
                return { type: actions.CHECK_AUTH_NO_USER, payload: null }
            }

        }).catch((res: any) => Observable.of({ type: actions.CHECK_AUTH_FAILED, payload: res }))
  */

  // https://gitter.im/ngrx/store?at=57f1bf01b0ff456d3adca786
  // But this link gives typescript promise errors.
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public anonymousAuthentication$ = this.actions$
    .ofType(LoginActionTypes.AnonymousAuthentication)
    .map(() =>
      this.auth$.auth
        .signInAnonymously()
        .then((user) =>
          this.state$.dispatch(
            new RestoreAuthentication({
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
            new RestoreAuthentication({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            }),
          ),
        )
        .catch((error) => this.state$.dispatch(new CreateUserFailure(error)));
    });

  // tslint:disable-next-line:member-ordering
  @Effect()
  public logout$ = this.actions$
    .ofType(LoginActionTypes.LOGOUT)
    .switchMap(() => this.auth$.auth.signOut())
    .map((res: any) => new LogoutSuccess())
    .catch((error: any) => Observable.of(new LogoutFailure(error)));

  /***** Working *****/
  // tslint:disable-next-line:member-ordering
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

  /**************************
  @Effect({ dispatch: false }) emailAuthentication$ = this.actions$
    .ofType(LoginActions.ActionTypes.EMAIL_AUTHENTICATION)
    // .do(x => console.log('login.effect:emailAuthentication>', x))
    .map((action: LoginActions.EmailAuthenticationAction) => action.payload)
    .map(payload => {
      this.af.auth.login(
        { email: payload.userName, password: payload.password },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password
        })
        .then(user => this.state$.dispatch(new LoginActions.RestoreAuthenticationAction({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch(error => this.state$.dispatch(new LoginActions.EmailAuthenticationFailureAction(error)))
    });

  @Effect({ dispatch: false }) authorizeWithGoogle$ = this.actions$
    .ofType(LoginActions.ActionTypes.GOOGLE_AUTHENTICATION)
    // .do(x => console.log('login.effect:authorizeWithGoogle>', x))
    // .map((action: LoginActions.GoogleAuthenticationAction) => action.payload)
    .map(() => {
      this.af.auth.login(
        {
          provider: AuthProviders.Google,
          method: AuthMethods.Popup
        })
        .then(user => this.state$.dispatch(new LoginActions.RestoreAuthenticationAction({
          displayName: user.auth.displayName,
          email: user.auth.email,
          isAnonymous: user.auth.isAnonymous,
        })))
        .catch(error => this.state$.dispatch(new LoginActions.GoogleAuthenticationFailureAction(error)))
    });

******************/
}
