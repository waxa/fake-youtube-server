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

  private loginStateSubject: Subject<boolean>;
  private loginStateObserver: Observable<any>;

  constructor(public http: Http) {
    this.setUpService();
  }

  private setUpService(): void {
    this.setUploginState();
  }

  private setUploginState(): void {
    this.loginStateSubject = new Subject();
    this.loginStateObserver = this.http.get(this.apiUrls.login)
    .catch(error => Observable.throw(error));
  }

  private subscribeloginStateObserver() {
    this.loginStateObserver.subscribe(
      success => this.loginStateSubject.next(true),
      error => this.loginStateSubject.next(false)
    );
  }

  public getloginState(): Observable<boolean> {
    this.subscribeloginStateObserver();
    return this.loginStateSubject;
  }

  // public login(user:any): Observable<any> {
  //   return this.http.post(this.apiUrls.login, user)
  //   .catch(error => Observable.throw(error));
  // }
  //
  // public logout(): Observable<any> {
  //   return this.http.delete(this.apiUrls.login)
  //   .catch(error => Observable.throw(error));
  // }
  //
  // public isAvailable(username: string): Observable<any> {
  //   return this.http.get(`${this.apiUrls.users}/${username}`)
  //   .catch(error => Observable.throw(error));
  // }
  //
  // public registerUser(user: any): Observable<any> {
  //   return this.http.post(this.apiUrls.users, user)
  //   .catch(error => Observable.throw(error));
  // }
  //
  // public getUserData(): Observable<any> {
  //   return this.http.get(this.apiUrls.users)
  //   .catch(error => Observable.throw(error));
  // }
}
