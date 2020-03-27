import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthService {

  constructor() { }

  login(data): Observable<boolean> {
    const { username, password} = data;
    if(username ==='admin' && password ==='admin') {
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)
      return of(true);
    } else if(username ==='guest' && password ==='guest') {
      localStorage.setItem('isAdmin', 'false')
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)
      return of(true);
    } else{ 
      return of(false);
    }
  }

  logout(): Observable<boolean>{
    localStorage.clear();
    return of(true)
  }

  isLoggedIn(): Observable<boolean>{
    const loggedin = localStorage.getItem('isLoggedIn') ==='true' ? true : false;
    return of(loggedin);
  }

  isAdmin(): Observable<boolean>{
    const isAdmin = localStorage.getItem('isAdmin') ==='true' ? true : false;
    return of(isAdmin);
  }

  getUserName(): Observable<string> {
    const username = localStorage.getItem('username');
    return of(username);
  }
}
