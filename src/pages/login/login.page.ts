import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup.page';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as loginActions from '../../actions/login.action';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login.page.html',
})
export class LoginPage {
  // login: { username?: string, password?: string } = {};
  submitted = false;
  public loginForm: FormGroup;

  loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private nav: NavController,
    private store: Store<fromRoot.IState>
  ) {
    //
    this.loginState$ = this.store.select(fromRoot.getLoginState);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /*
  ionViewDidLoad() {
    //
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
*/

  logForm() {
    console.log(this.loginForm.value);
    console.log('loginForm>', this.loginForm);

    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(
        new loginActions.EmailAuthentication({
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
      );
    }
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(
        new loginActions.EmailAuthentication({
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
      );
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

  signInAnonymously() {
    this.store.dispatch(new loginActions.AnonymousAuthentication());
  }

  signInWithGoogle() {
    this.store.dispatch(new loginActions.GoogleAuthentication());
  }
}
