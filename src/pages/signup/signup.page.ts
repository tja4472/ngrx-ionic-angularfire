import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as loginActions from '../../actions/login.action'

import { Validators, FormBuilder } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'signup.page.html'
})
export class SignupPage {
  // signup: { username?: string, password?: string } = {};
  submitted = false;
  public loginForm;

  loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>) {
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
        new loginActions.CreateUserAction({
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password,
        }));
    }
  }
  /*
  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
      this.store.dispatch(
        this.loginActions.createUser(
          this.signup.username,
          this.signup.password));
    }
  }
*/
}
