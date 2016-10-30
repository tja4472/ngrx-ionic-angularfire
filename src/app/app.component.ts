import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';

import { Store } from '@ngrx/store';
import * as FromRoot from '../reducers';

// Should be import * as LoginActions from '../actions/login.action';
// See: https://gitter.im/ngrx/effects?at=57f3a2cbd45d7f0f52601422
import * as LoginActions from '../actions/login.action'

import {
  AngularFire,
  //  defaultFirebase,
  //  FIREBASE_PROVIDERS,
  FirebaseAuthState
} from 'angularfire2';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  loginState$: any;
  // private subscription;

  constructor(
    public af: AngularFire,
    public platform: Platform,
    private store: Store<FromRoot.State>,
  ) {
    //
    this.initializeApp();

    this.loginState$ = this.store.let(FromRoot.getLoginState);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'Page Home', component: HomePage },
      { title: 'Page Login', component: LoginPage },
      { title: 'Page Signup', component: SignupPage },
      { title: 'Logout', component: Page1 },
    ];
    // Subscribe to the auth object to check for the login status
    // of the user.      
    af.auth.take(1).subscribe((authState: FirebaseAuthState) => {
      // Run once.
      // af.auth.unsubscribe();

      console.log('af.auth.subscribe:authState>', authState);
      let authenticated: boolean = !!authState;

      console.log('authenticated:', authenticated);

      if (authenticated) {
        this.store.dispatch(
                    new LoginActions.RestoreAuthenticationAction({
                        displayName: authState.auth.displayName,
                        email: authState.auth.email,
                        isAnonymous: authState.auth.isAnonymous,
                    }));
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

/*
    this.subscription =
      this.store
        .let(FromRoot.getLoginState)
        .subscribe(loginState => {
          // Triggered when loginState changes. 
          // i.e. when user logs in or logs out.
          console.log('loginState>', loginState);
          console.log('loginState.isAuthorized>', loginState.isAuthenticated);
          // this.enableMenu(loginState.isAuthenticated);

          /*
                    if (loginState.isAuthorized) {
                      this.rootPage = HomePage;
                    }
                    else {
                      this.rootPage = LoginPage;
                    }
          * /
        });
*/        
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        // this.userData.logout();
        this.store.dispatch(
          new LoginActions.LogoutAction());
        this.af.auth.logout();
      }, 1000);
    }
  }
}
