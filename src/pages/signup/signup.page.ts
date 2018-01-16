import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as loginActions from '../../actions/login.action';
import * as fromRoot from '../../reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'signup.page.html',
})
export class SignupPage {
  // signup: { username?: string, password?: string } = {};
  public submitted = false;
  public loginForm: FormGroup;

  public loginState$: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.IState>,
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

  public logForm() {
    console.log(this.loginForm.value);
    console.log('loginForm>', this.loginForm);

    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(
        new loginActions.CreateUser({
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password,
        }),
      );
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
