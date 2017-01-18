import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../users.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginState: boolean = false;
  loginStateSubscription: Subscription;

  constructor( private usersService: UsersService, private router: Router ) {
    console.log("constructor", this.loginState);
  }

  ngOnInit() {
    this.loginStateSubscription = this.usersService.getloginState()
    .subscribe(loginState => this.subscribeLoginState(loginState));
  }

  private subscribeLoginState(loginState: boolean):void {
    this.loginState = loginState;
    if (this.loginState) {
      this.router.navigate(['/dashboard']);
    }
    console.log("loggin state en loginComponent", this.loginState);

  }

  ngOnDestroy() {
    this.loginStateSubscription.unsubscribe();
  }

}
