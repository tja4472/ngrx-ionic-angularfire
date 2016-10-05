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

// Should be import * as LoginActions from '../actions/login.action';
// See: https://gitter.im/ngrx/effects?at=57f3a2cbd45d7f0f52601422
import * as LoginActions from '../actions/login.action';

// import { TextItem } from '../models';
import { AngularFire, AuthMethods } from 'angularfire2';

import { State } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private state$: Store<State>,
    public af: AngularFire
  ) { }

  // https://gitter.im/ngrx/store?at=57f1bf01b0ff456d3adca786
  // But this link gives typescript promise errors.

  @Effect({ dispatch: false }) anonymousAuthentication$ = this.actions$
    .ofType(LoginActions.LoginActionTypes.ANONYMOUS_AUTHENTICATION)
    .map(() =>
      this.af.auth.login(
        {
          method: AuthMethods.Anonymous
        })
        .then(user => this.state$.dispatch(new LoginActions.AnonymousAuthenticationSuccessAction(user)))
        .catch(error => this.state$.dispatch(new LoginActions.AnonymousAuthenticationFailureAction(error)))
    );


  @Effect({ dispatch: false }) createUser$ = this.actions$
    .ofType(LoginActions.LoginActionTypes.CREATE_USER)
    .do(x => console.log('login.effect:createUser>', x))
    .map((action: LoginActions.CreateUserAction) => action.payload)
    .map(payload => {
      console.log('payload>', payload);
      console.log('payload.userName>', payload.userName);
    })
  ;

}
