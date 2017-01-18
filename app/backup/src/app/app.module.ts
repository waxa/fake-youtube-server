import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { LoginService } from '../providers/login-service';
import { UsersService } from '../providers/users-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegistroPage,
    DashboardPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegistroPage,
    DashboardPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LoginService, useClass: LoginService},
    {provide: UsersService, useClass: UsersService}
  ]
})
export class AppModule {}
