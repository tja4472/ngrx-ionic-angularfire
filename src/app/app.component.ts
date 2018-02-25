import { Component, ViewChild } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { skip } from 'rxjs/operators';

import * as FromAuthSelector from '../app/auth/auth.selector';
import { GadgetListPage } from '../gadget/pages/gadget-list/gadget-list.page';
import { GizmoListPage } from '../gizmo/pages/gizmo-list/gizmo-list.page';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { RealtimeDatabasePage } from '../pages/realtime-database/realtime-database.page';
import { SignupPage } from '../pages/signup/signup.page';
import * as FromRoot from '../reducers';
import { WidgetListPage } from '../widget/pages/widget-list/widget-list.page';
import * as AuthActions from './auth/auth.action';

// Should be import * as LoginActions from '../actions/login.action';
// See: https://gitter.im/ngrx/effects?at=57f3a2cbd45d7f0f52601422
//
// Do not import from 'firebase' as you'd lose the tree shaking benefits
// Add the RxJS Observable operators we need in this app.
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  doSignOut?: boolean;
}

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  public rootPage: any;

  public viewAppPages: PageInterface[] = [
    { title: 'Page One', component: Page1, icon: 'calendar' },
    { title: 'Page Two', component: Page2, icon: 'calendar' },
  ];

  public viewSignedInPages: PageInterface[] = [
    { title: 'Page Home', component: HomePage, icon: 'calendar' },
    {
      component: GadgetListPage,
      icon: 'calendar',
      title: 'Gadgets(Realtime Database)',
    },
    {
      component: GizmoListPage,
      icon: 'calendar',
      title: 'Gizmos(Cloud Firestore)',
    },
    {
      component: WidgetListPage,
      icon: 'calendar',
      title: 'Widgets(Cloud Firestore)',
    },
    {
      component: RealtimeDatabasePage,
      icon: 'calendar',
      title: 'Realtime Database',
    },
    { title: 'Page Login', component: LoginPage, icon: 'calendar' },
    { title: 'Page Signup', component: SignupPage, icon: 'calendar' },
    { title: 'Sign Out', component: Page1, icon: 'log-out', doSignOut: true },
  ];

  public viewSignedOutPages: PageInterface[] = [
    { title: 'Page Login', component: LoginPage, icon: 'calendar' },
    { title: 'Page Signup', component: SignupPage, icon: 'calendar' },
  ];

  public loginState$: any;

  private readonly signedInMenuId = 'signedInMenu';
  private readonly signedOutMenuId = 'signedOutMenu';

  constructor(
    public afAuth: AngularFireAuth,
    public menuController: MenuController,
    public platform: Platform,
    public statusBar: StatusBar,
    private store: Store<FromRoot.State>,
  ) {
    //
    console.log('MyApp:constructor');
    this.initializeApp();

    this.loginState$ = this.store.select(FromAuthSelector.getAuthState);

    /*
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'Page Home', component: HomePage },
      { title: 'Gadgets(Realtime Database)', component: GadgetListPage },
      { title: 'Gizmos(Cloud Firestore)', component: GizmoListPage },
      { title: 'Widgets(Cloud Firestore)', component: WidgetListPage },
      { title: 'Realtime Database', component: RealtimeDatabasePage },
      { title: 'Page Login', component: LoginPage },
      { title: 'Page Signup', component: SignupPage },
      { title: 'Logout', component: Page1 },
    ];
*/
    this.store
      .select(FromAuthSelector.getAuthState)
      .pipe(
        // Ignore setting of initial state
        skip(1),
      )
      .subscribe((loginState) => {
        console.log('loginState>', loginState);

        if (loginState.isAuthenticated) {
          this.enableMenu(true);
          this.rootPage = HomePage;
        } else {
          this.enableMenu(false);
          this.rootPage = Page1;
        }
      });

    /*
    // Subscribe to the auth object to check for the login status
    // of the user.
    afAuth.authState.take(1).subscribe((authState: firebase.User) => {
      // Run once.
      // af.auth.unsubscribe();

      console.log('af.auth.subscribe:authState>', authState);
      const authenticated: boolean = !!authState;

      console.log('authenticated:', authenticated);
      // this.rootPage = HomePage;
      if (authenticated) {
        this.rootPage = HomePage;
        this.store.dispatch(
          new LoginActions.RestoreAuthentication({
            displayName: authState.displayName,
            email: authState.email,
            isAnonymous: authState.isAnonymous,
          }),
        );

      } else {
        this.rootPage = Page1;
      }
    });
*/
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      console.log('platform.ready');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
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

  public viewIsActive(page: PageInterface) {
    if (
      this.nav.getActive() &&
      this.nav.getActive().component === page.component
    ) {
      return 'primary';
    }
    return;
  }

  public viewOpenPage(page: PageInterface) {
    console.log('viewOpenPage');

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);

    // if (page.title === 'Logout') {
    if (page.doSignOut) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        // this.userData.logout();
        this.store.dispatch(new AuthActions.SignOut());
        // this.afAuth.auth.signOut();
      }, 1000);
    } else {
      this.nav.setRoot(page.component);
    }
  }

  private enableMenu(signedIn: boolean): void {
    //
    if (!this.menuController.get(this.signedInMenuId)) {
      console.error(
        `enableMenu() *** WARNING: Menu not found>`,
        this.signedInMenuId,
      );
    }

    if (!this.menuController.get(this.signedOutMenuId)) {
      console.error(
        `enableMenu() *** WARNING: Menu not found>`,
        this.signedOutMenuId,
      );
    }

    this.menuController.enable(signedIn, this.signedInMenuId);
    this.menuController.enable(!signedIn, this.signedOutMenuId);
  }
}
