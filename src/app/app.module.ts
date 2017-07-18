import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { SignupPage } from '../pages/signup/signup.page';

import { Error } from '../components/error/error.component';
import { ExampleList } from '../components/example-list/example-list.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyFirebaseAppConfig } from './my-firebase-app-config';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducer } from '../reducers';

import { LoginEffects } from '../effects/login.effect';
import { TextItemEffects } from '../effects/text-item.effect';

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
    StoreModule.provideStore(reducer),
    EffectsModule.run(LoginEffects),
    EffectsModule.run(TextItemEffects),    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }
