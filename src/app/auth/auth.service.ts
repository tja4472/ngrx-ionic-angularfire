import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AuthService {
  constructor(private readonly auth$: AngularFireAuth) {}

  public authState$() {
    return this.auth$.authState;
  }

  public createUserWithEmailAndPassword(email: string, password: string) {
    return Observable.fromPromise(
      this.auth$.auth.createUserWithEmailAndPassword(email, password),
    );
  }

  public sendEmailVerification() {
    if (this.auth$.auth.currentUser) {
      return Observable.fromPromise(
        this.auth$.auth.currentUser.sendEmailVerification(),
      );
    } else {
      return empty();
    }
  }

  public sendPasswordResetEmail(email: string) {
    return Observable.fromPromise(
      this.auth$.auth.sendPasswordResetEmail(email),
    );
  }

  public signInWithEmailAndPassword(email: string, password: string) {
    return this.auth$.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut() {
    return Observable.fromPromise(this.auth$.auth.signOut());
  }

  public updatePassword(password: string) {
    if (this.auth$.auth.currentUser) {
      return Observable.fromPromise(
        this.auth$.auth.currentUser.updatePassword(password),
      );
    } else {
      return empty();
    }
  }
}
