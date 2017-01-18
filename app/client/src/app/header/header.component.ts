import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { HeaderService } from '../header.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo: String;
  tituloSubscription: Subscription;

  back: boolean = false;
  backSubscription: Subscription;

  loginState: boolean = false;
  loginStateSubscription: Subscription;

  constructor(
    private router: Router,
    private header: HeaderService,
    private users: UsersService
  ) {}

  ngOnInit() {
    console.log("init header");
    this.tituloSubscription = this.header.getTituloObserver()
    .subscribe(titulo => this.titulo = titulo);
    this.backSubscription = this.header.getBackObserver()
    .subscribe(back => this.back = back);
    this.loginStateSubscription = this.users.getloginState()
    .subscribe(loginState => this.subscribeLoginState(loginState));
  }

  private subscribeLoginState(loginState: boolean):void {
    this.loginState = loginState;
  }

  public onClickBack(): void {
    this.router.navigate(this.header.getBackArgs());
  }

  public onClickLogout(): void {
    this.users.doLogout();
  }

  ngOnDestroy() {
    console.log("destroy header");
    this.tituloSubscription.unsubscribe();
    this.backSubscription.unsubscribe();
    this.loginStateSubscription.unsubscribe();
  }

}
