import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private readonly auth$: AngularFireAuth) {}

  public authState$() {
    return this.auth$.authState;
  }

  public signInWithEmailAndPassword(email: string, password: string) {
    return Observable.fromPromise(
      this.auth$.auth.signInWithEmailAndPassword(email, password),
    );
  }

  public signOut() {
    return Observable.fromPromise(this.auth$.auth.signOut());
  }
}
