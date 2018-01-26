import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  AuthActionTypes,
  CheckAuthFailure,
  CheckAuthNoUser,
  CheckAuthSuccess,
  EmailAuthentication,
  EmailAuthenticationFailure,
  EmailAuthenticationSuccess,
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
  public checkAuth$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMap(() =>
      this.authService.authState$().pipe(
        map((firebaseUser) => {
          if (firebaseUser) {
            return new CheckAuthSuccess({
              signedInUser: {
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                userId: firebaseUser.uid,
              },
            });
          } else {
            return new CheckAuthNoUser();
          }
        }),
        catchError((error: any) => of(new CheckAuthFailure(error))),
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
          map((res: any) => new SignOutSuccess()),
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
}
