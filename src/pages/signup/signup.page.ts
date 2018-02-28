import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as authActions from '../../app/auth/auth.action';
import * as FromAuthSelector from '../../app/auth/auth.selector';
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
        new authActions.CreateUserWithEmailAndPassword({
          email: this.loginForm.value.username,
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
        this.authActions.createUser(
          this.signup.username,
          this.signup.password));
    }
  }
*/
}
