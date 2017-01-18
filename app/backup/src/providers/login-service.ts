import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginService {

  apiUrl: string = 'http://localhost:27042/api/login';

  constructor(public http: Http) {
  }

  public isLogged(): Observable<any> {
    return this.http.get(this.apiUrl)
    .catch(error => Observable.throw(error));
  };

  public login(user:any): Observable<any> {
    return this.http.post(this.apiUrl, user)
    .catch(error => Observable.throw(error));
  };

  public logout(): Observable<any> {
    return this.http.delete(this.apiUrl)
    .catch(error => Observable.throw(error));
  }

}
