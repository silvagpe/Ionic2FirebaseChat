import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { ChatPage } from './../pages/chat/chat';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { UserProfilePage } from './../pages/user-profile/user-profile';

import { AuthService } from '../providers/auth.service';
import { ChatService } from './../providers/chat.service';
import { MessageService } from './../providers/message.service';
import { UserService } from './../providers/user.service';

import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { MessageBoxComponent } from './../components/message-box/message-box';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar';
import { UserInfoComponent } from './../components/user-info/user-info';
import { UserMenuComponent } from './../components/user-menu/user-menu';



const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBbYPyE3iJx6fFF_lx9RRpwBC-uOFdbPKw",
  authDomain: "ionic-firebase-chat-silva.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-silva.firebaseio.com",
  projectId: "ionic-firebase-chat-silva",
  storageBucket: "ionic-firebase-chat-silva.appspot.com",
  messagingSenderId: "1041541057345"
};

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }
