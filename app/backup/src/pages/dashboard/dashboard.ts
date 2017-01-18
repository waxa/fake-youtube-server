import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { LoginService } from '../../providers/login-service';
import { UsersService } from '../../providers/users-service';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService,
    public usersService: UsersService,
    public menuCtrl: MenuController
  ) {}

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.getData();
  }

  private getData():void {
    this.usersService.getUserData().subscribe(
      success => console.log("getdatauser success", success._body),
      error => this.navCtrl.setRoot(LoginPage)
    );
  }

}
