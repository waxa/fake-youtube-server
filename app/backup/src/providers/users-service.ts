import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UsersService {

  apiUrl: string = 'http://localhost:27042/api/users';

  constructor(public http: Http) {
  }

  public isAvailable(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`)
    .catch(error => Observable.throw(error));
  };

  public registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user)
    .catch(error => Observable.throw(error));
  };

  public getUserData(): Observable<any> {
    return this.http.get(this.apiUrl)
    .catch(error => Observable.throw(error));
  };
}
