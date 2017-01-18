import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {

  apiUrls = {
    login: 'http://localhost:27042/api/login',
    users: 'http://localhost:27042/api/users'
  }

  credentials = {
    withCredentials: true
  };

  private loginStateSubject: Subject<boolean>;
  private singUpStateSubject: Subject<boolean>;
  private loginStateObserver: Observable<any>;

  constructor(public http: Http) {
    this.setUpService();
  }

  private setUpService(): void {
    this.setUploginState();
    this.setUpSingUpState();
  }

  private setUploginState(): void {
    this.loginStateSubject = new Subject();
    this.loginStateObserver = this.http.get(this.apiUrls.login, this.credentials)
    .catch(error => Observable.throw(error));
  }

  private subscribeLoginStateObserver() {
    this.loginStateObserver.subscribe(
      success => this.loginStateSubject.next(true),
      error => this.loginStateSubject.next(false)
    );
  }

  public getloginState(): Observable<boolean> {
    this.subscribeLoginStateObserver();
    return this.loginStateSubject;
  }

  public doLogin(user: any): void {
    this.http.post(this.apiUrls.login, user, this.credentials)
    .catch(error => Observable.throw(error))
    .subscribe(
      success => this.loginStateSubject.next(true),
      error => this.loginStateSubject.next(false)
    );
  }

  public doLogout(): void {
    this.http.delete(this.apiUrls.login, this.credentials)
    .catch(error => Observable.throw(error))
    .subscribe(
      success => this.loginStateSubject.next(false),
      error => this.loginStateSubject.next(false)
    );
  }

  private setUpSingUpState(): void {
    this.singUpStateSubject = new Subject();
  }

  public getSingUpState(): Observable<boolean> {
    return this.singUpStateSubject;
  }

  public doSingUp(user: any): void {
    this.http.post(this.apiUrls.users, user, this.credentials)
    .catch(error => Observable.throw(error))
    .subscribe(
      success => this.singUpStateSubject.next(true),
      error => this.singUpStateSubject.next(false)
    );
  }

  //
  // public isAvailable(username: string): Observable<any> {
  //   return this.http.get(`${this.apiUrls.users}/${username}`)
  //   .catch(error => Observable.throw(error));
  // }
  //

  //
  // public getUserData(): Observable<any> {
  //   return this.http.get(this.apiUrls.users)
  //   .catch(error => Observable.throw(error));
  // }
}
