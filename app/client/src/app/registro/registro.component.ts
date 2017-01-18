import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from '../users.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  loginState: boolean = false;
  loginStateSubscription: Subscription;
  singUpStateSubscription: Subscription;

  user: any = {};

  constructor(
    private users: UsersService,
    private header: HeaderService,
    private router: Router ) {}

  ngOnInit() {
    console.log("init registro");
    this.header.setTitulo("Registro");
    this.header.setBack(true, ["/login"]);
    this.loginStateSubscription = this.users.getloginState()
    .subscribe(loginState => this.subscribeLoginState(loginState));
    this.singUpStateSubscription = this.users.getSingUpState().
    subscribe(singUpState => this.subscribeSingUpState(singUpState));
  }

  private subscribeLoginState(loginState: boolean):void {
    this.loginState = loginState;
    if (this.loginState) {
      this.router.navigate(['/dashboard']);
    }
  }

  private subscribeSingUpState(singUpState: boolean):void {
    if (singUpState) {
      this.router.navigate(['/login']);
    }
  }

  public validForm(): boolean {
    if (!this.user || this.user == {}) { return false; }
    if ( this.user.password && this.user.repeatPassword &&
      this.user.password === this.user.repeatPassword ){
      return true;
    }
    return false;
  };

  public onClickRegistrarse(user: any): void {
    this.users.doSingUp(user);
  }

  ngOnDestroy() {
    console.log("destroy registro");
    this.loginStateSubscription.unsubscribe();
    this.singUpStateSubscription.unsubscribe();
  }
}
