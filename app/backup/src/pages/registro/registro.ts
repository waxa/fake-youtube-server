import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../../providers/users-service';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  options:any = {
    invalid: "md-alert",
    valid: "md-checkmark",
    loading: "md-refresh"
  };
  userFreeStream: Subject<string> = new Subject<string>();
  userFreeObserver: Observable<any[]>;
  userFreeIcon: string;
  user:any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersService
  ) {
    this.userFreeIcon = this.options.invalid;
  };

  ionViewDidLoad() {
    this.userFreeObserver = this.userFreeStream
     .debounceTime(700)
     .distinctUntilChanged()
     .switchMap((nick: string) => this.usersService.isAvailable(nick));
  };

  private registrar(): void {
    this.usersService.registerUser({
      username: this.user.username,
      password: this.user.password
    })
    .subscribe(
      success => {
          this.navCtrl.pop();
      }, error => {
        console.log("register error", error);
      }
    );

    this.user.password = "";
    this.user.repeatPassword = ""
    this.userFreeIcon = this.options.loading;
  };

  public search(nick: string): void {
    this.userFreeIcon = this.options.loading;
    this.userFreeStream.next(nick);

    this.userFreeObserver.subscribe(
      success => {
        this.userFreeIcon = this.options.invalid;
      }, error => {
        if (error.status === 404){ this.userFreeIcon = this.options.valid; }
        else { this.userFreeIcon = this.options.invalid; }
      }
    );
  };

  public validForm(): boolean {
    if (!this.user || this.user == {}) { return false; }
    if ( this.userFreeIcon === this.options.valid &&
      this.user.password &&
      this.user.password === this.user.repeatPassword ){
      return true;
    }
    return false;
  };

  public onClickRegistrar(): void {
    if (this.validForm()) {
      this.registrar();
    }
  };

}
