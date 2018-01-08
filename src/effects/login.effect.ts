import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';

import 'rxjs/add/operator/first';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
// error TS4029: https://github.com/Microsoft/TypeScript/issues/5938
// tslint:disable-next-line:no-unused-variable
import { Observable } from 'rxjs/Observable';

// import { LoadCollectionSuccessAction, TextItemActionTypes } from '../actions/textitem.action';

// import * as loginActions from '../actions/login.action';

// import { TextItem } from '../models';
//
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

import { State } from '../reducers';
import { Store } from '@ngrx/store';
import {
  LoginActionTypes,
  RestoreAuthentication,
  AnonymousAuthenticationFailure,
  CreateUser,
  CreateUserFailure,
} from '../actions/login.action';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<State>,
    public af: AngularFireAuth
  ) {}

  // https://gitter.im/ngrx/store?at=57f1bf01b0ff456d3adca786
  // But this link gives typescript promise errors.

  @Effect({ dispatch: false })
  anonymousAuthentication$ = this.actions$
    .ofType(LoginActionTypes.AnonymousAuthentication)
    .map(() =>
      this.af.auth
        .signInAnonymously()
        .then((user) =>
          this.state$.dispatch(
            new RestoreAuthentication({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            })
          )
        )
        .catch((error) =>
          this.state$.dispatch(new AnonymousAuthenticationFailure(error))
        )
    );

  @Effect({ dispatch: false })
  createUser$ = this.actions$
    .ofType(LoginActionTypes.CreateUser)
    // .do(x => console.log('login.effect:createUser>', x))
    .map((action: CreateUser) => action.payload)
    .map((payload) => {
      this.af.auth
        .createUserWithEmailAndPassword(payload.userName, payload.password)
        .then((user) =>
          this.state$.dispatch(
            new RestoreAuthentication({
              displayName: user.auth.displayName,
              email: user.auth.email,
              isAnonymous: user.auth.isAnonymous,
            })
          )
        )
        .catch((error) => this.state$.dispatch(new CreateUserFailure(error)));
    });

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
