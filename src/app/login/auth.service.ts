import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInfo } from './user.info';


@Injectable({
  providedIn:'root'
})
export class AuthService {

  loggedInUser: UserInfo;

  constructor() { }

  login(data: UserInfo): Observable<boolean> {
    const { username, password} = data;
    if(username ==='admin' && password ==='admin') {
      data.isAdmin = true;
      data.isLoggedIn = true;
      this.setLoginUserData(data);
      return of(true);
    } else if(username ==='guest' && password ==='guest') {
      data.isAdmin = false;
      data.isLoggedIn = true;
      this.setLoginUserData(data);
      return of(true);
    } else{ 
      return of(false);
    }
  }

  setLoginUserData(data:UserInfo) {
    delete data.password
    localStorage.setItem('loggedInUser', JSON.stringify(data));
  }

  getLoginUserData() {
    return localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : {};
  }

  logout(): Observable<boolean>{
    localStorage.clear();
    return of(true)
  }

  isLoggedIn(): Observable<boolean>{
    const userdata: UserInfo = this.getLoginUserData();
    const loggedin = userdata && userdata.isLoggedIn ? true : false;
    return of(loggedin);
  }

  isAdmin(): Observable<boolean>{
    const userdata: UserInfo = this.getLoginUserData();
    const isAdmin = userdata && userdata.isAdmin ? true : false;
    return of(isAdmin);
  }

  getUserName(): Observable<string> {
    const userdata: UserInfo = this.getLoginUserData();
    const username = userdata && userdata.username;
    return of(username);
  }
}
