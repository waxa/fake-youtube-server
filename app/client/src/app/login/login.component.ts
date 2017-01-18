import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../users.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginState: boolean = false;
  loginStateSubscription: Subscription;

  user: any = {};

  constructor(
    private users: UsersService,
    private header: HeaderService,
    private router: Router ) {}

  ngOnInit() {
    console.log("init login");
    this.header.setTitulo("Login");
    this.header.setBack(false, []);
    this.loginStateSubscription = this.users.getloginState()
    .subscribe(loginState => this.subscribeLoginState(loginState));
  }

  private subscribeLoginState(loginState: boolean):void {
    this.loginState = loginState;
    if (this.loginState) {
      this.router.navigate(['/dashboard']);
    }
  }

  public validForm(): boolean {
    if (!this.user || this.user == {}) { return false; }
    if ( this.user.username && this.user.password ){
      return true;
    }
    return false;
  };

  public onClickLogin(user: any): void {
    this.users.doLogin(user);
  }

  public onClickRegistarse() {
    this.router.navigate(['/registro']);
  }

  ngOnDestroy() {
    console.log("destroy login");
    this.loginStateSubscription.unsubscribe();
  }

}
