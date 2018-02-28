import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';

import * as authActions from '../../app/auth/auth.action';
import * as FromAuthSelector from '../../app/auth/auth.selector';
import * as fromRoot from '../../reducers';
import { SignupPage } from '../signup/signup.page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login.page.html',
})
export class LoginPage {
  // login: { username?: string, password?: string } = {};
  public submitted = false;
  public loginForm: FormGroup;

  public loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private nav: NavController,
    private store: Store<fromRoot.State>,
  ) {
    //
    this.loginState$ = this.store.select(FromAuthSelector.getAuthState);

    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
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

  public logForm() {
    console.log(this.loginForm.value);
    console.log('loginForm>', this.loginForm);

    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(
        new authActions.EmailAuthentication({
          password: this.loginForm.value.password,
          userName: this.loginForm.value.username,
        }),
      );
    }
  }

  public onLogin() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(
        new authActions.EmailAuthentication({
          password: this.loginForm.value.password,
          userName: this.loginForm.value.username,
        }),
      );
    }
  }

  public onSignup() {
    this.nav.push(SignupPage);
  }

  public viewChangePasswordClick() {
    console.log('viewChangePasswordClick');
    if (this.loginForm.valid) {
      this.store.dispatch(
        new authActions.UpdatePassword({
          password: this.loginForm.value.password,
        }),
      );
    }
  }

  public viewResetPasswordClick() {
    console.log('viewResetPasswordClick');
    if (this.loginForm.valid) {
      this.store.dispatch(
        new authActions.SendPasswordResetEmail({
          email: this.loginForm.value.username,
        }),
      );
    }
  }
}
