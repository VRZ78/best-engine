import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {APIService} from "../shared/service/APIService.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "../shared/service/user.service";
import {CreateAccountPage} from "../pages/create-account/create-account";
import {OrderDetailsPage} from "../pages/order-details/order-details";
import {AuthInterceptorService} from "../shared/service/auth-interceptor.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CreateAccountPage,
    OrderDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CreateAccountPage,
    OrderDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    APIService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
