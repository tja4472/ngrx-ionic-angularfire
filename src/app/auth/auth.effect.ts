import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
import {
  AuthActionTypes,
  EmailAuthentication,
  EmailAuthenticationFailure,
  EmailAuthenticationSuccess,
  ListenForAuth,
  ListenForAuthFailure,
  ListenForAuthNoUser,
  ListenForAuthSuccess,
  SignOutFailure,
  SignOutSuccess,
} from './auth.action';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  public ListenForAuth$ = this.actions$.pipe(
    ofType<ListenForAuth>(AuthActionTypes.LISTEN_FOR_AUTH),
    tap(() => console.log('ListenForAuth$')),
    switchMap(() =>
      this.authService.authState$().pipe(
        map((firebaseUser) => {
          if (firebaseUser) {
            return new ListenForAuthSuccess({
              signedInUser: {
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                userId: firebaseUser.uid,
              },
            });
          } else {
            return new ListenForAuthNoUser();
          }
        }),
        catchError((error: any) => of(new ListenForAuthFailure(error))),
      ),
    ),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public signOut$ = this.actions$
    .ofType(AuthActionTypes.SIGN_OUT)
    .switchMap(() =>
      this.authService
        .signOut()
        .pipe(
          map(() => new SignOutSuccess()),
          catchError((error: any) => of(new SignOutFailure(error))),
        ),
    );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public emailAuthentication$ = this.actions$
    .ofType(AuthActionTypes.EMAIL_AUTHENTICATION)
    .map((action: EmailAuthentication) => action.payload)
    .switchMap((payload) =>
      this.authService
        .signInWithEmailAndPassword(payload.userName, payload.password)
        .pipe(
          map(() => new EmailAuthenticationSuccess()),
          catchError((error: any) =>
            of(new EmailAuthenticationFailure({ error })),
          ),
        ),
    );

  // Should be your last effect
  // tslint:disable-next-line:member-ordering
 @Effect() public init$: Observable<any> = defer(() => {
  return of(new ListenForAuth());
});
}
