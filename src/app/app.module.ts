import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';

import { UserService } from './../providers/user.service';
import { BaseService } from '../providers/base.service';
import { AuthService } from '../providers/auth.service';


const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBbYPyE3iJx6fFF_lx9RRpwBC-uOFdbPKw",
  authDomain: "ionic-firebase-chat-silva.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-silva.firebaseio.com",
  projectId: "ionic-firebase-chat-silva",
  storageBucket: "",
  messagingSenderId: "1041541057345"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
  ]
})
export class AppModule { }
