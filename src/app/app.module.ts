import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

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
import { RealtimeDatabasePage } from '../pages/realtime-database/realtime-database.page';
import { SignupPage } from '../pages/signup/signup.page';
import { metaReducers, reducers } from '../reducers';
import { WidgetDetailModal } from '../widget/modals/widget-detail/widget-detail.modal';
import { WidgetListPage } from '../widget/pages/widget-list/widget-list.page';
import { WidgetDataService } from '../widget/widget.data.service';
import { WidgetEffects } from '../widget/widget.effect';
import { WidgetService } from '../widget/widget.service';
import { MyApp } from './app.component';
import { MyFirebaseAppConfig } from './my-firebase-app-config';

@NgModule({
  declarations: [
    WidgetDetailModal,
    WidgetListPage,
    Error,
    ExampleList,
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    RealtimeDatabasePage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(MyFirebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([LoginEffects, TextItemEffects, WidgetEffects]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WidgetDetailModal,
    WidgetListPage,
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    RealtimeDatabasePage,
    SignupPage,
  ],
  providers: [
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WidgetDataService,
    WidgetService,
  ],
})
export class AppModule {}
