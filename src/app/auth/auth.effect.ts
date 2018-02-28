import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  CreateUserWithEmailAndPassword,
  CreateUserWithEmailAndPasswordFailure,
  CreateUserWithEmailAndPasswordSuccess,
  EmailAuthentication,
  EmailAuthenticationFailure,
  EmailAuthenticationSuccess,
  ListenForAuth,
  ListenForAuthFailure,
  ListenForAuthNoUser,
  ListenForAuthSuccess,
  SendEmailVerification,
  SendEmailVerificationFailure,
  SendEmailVerificationSuccess,
  SendPasswordResetEmail,
  SendPasswordResetEmailFailure,
  SendPasswordResetEmailSuccess,
  SignOutFailure,
  SignOutSuccess,
  UpdatePassword,
  UpdatePasswordFailure,
  UpdatePasswordSuccess,
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
                emailVerified: firebaseUser.emailVerified,
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

  // tslint:disable-next-line:member-ordering
  @Effect()
  public createUserWithEmailAndPassword$ = this.actions$.pipe(
    ofType<CreateUserWithEmailAndPassword>(
      AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD,
    ),
    map((action) => action.payload),
    concatMap((payload) =>
      this.authService
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .pipe(
          map(() => new CreateUserWithEmailAndPasswordSuccess()),
          catchError((error: any) =>
            of(new CreateUserWithEmailAndPasswordFailure({ error })),
          ),
        ),
    ),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public sendEmailVerification$ = this.actions$.pipe(
    ofType<SendEmailVerification>(AuthActionTypes.SEND_EMAIL_VERIFICATION),
    concatMap(() =>
      this.authService
        .sendEmailVerification()
        .pipe(
          map(() => new SendEmailVerificationSuccess()),
          catchError((error: any) =>
            of(new SendEmailVerificationFailure({ error })),
          ),
        ),
    ),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public sendPasswordResetEmail$ = this.actions$.pipe(
    ofType<SendPasswordResetEmail>(AuthActionTypes.SEND_PASSWORD_RESET_EMAIL),
    map((action) => action.payload),
    concatMap((payload) =>
      this.authService
        .sendPasswordResetEmail(payload.email)
        .pipe(
          map(() => new SendPasswordResetEmailSuccess()),
          catchError((error: any) =>
            of(new SendPasswordResetEmailFailure({ error })),
          ),
        ),
    ),
  );

    // tslint:disable-next-line:member-ordering
    @Effect()
    public updatePassword$ = this.actions$.pipe(
      ofType<UpdatePassword>(AuthActionTypes.UPDATE_PASSWORD),
      map((action) => action.payload),
      concatMap((payload) =>
        this.authService
          .updatePassword(payload.password)
          .pipe(
            map(() => new UpdatePasswordSuccess()),
            catchError((error: any) =>
              of(new UpdatePasswordFailure({ error })),
            ),
          ),
      ),
    );
  // Should be your last effect
  // tslint:disable-next-line:member-ordering
  @Effect()
  public init$: Observable<any> = defer(() => {
    return of(new ListenForAuth());
  });
}
