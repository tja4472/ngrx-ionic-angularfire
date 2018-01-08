import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Error } from '../components/error/error.component';
import { ExampleList } from '../components/example-list/example-list.component';
import { LoginEffects } from '../effects/login.effect';
import { TextItemEffects } from '../effects/text-item.effect';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SignupPage } from '../pages/signup/signup.page';
import { reducers } from '../reducers';
import { MyApp } from './app.component';
import { MyFirebaseAppConfig } from './my-firebase-app-config';

@NgModule({
  declarations: [
    Error,
    ExampleList,
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([LoginEffects, TextItemEffects]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, Page1, Page2, HomePage, LoginPage, SignupPage],
  providers: [
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
