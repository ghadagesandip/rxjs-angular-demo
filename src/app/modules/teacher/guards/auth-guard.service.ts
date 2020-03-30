import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthService) {
    // console.log('can activate called')
  }

  canActivate(): boolean {
    let isLoggedIn:boolean;
    this.authService.isLoggedIn().subscribe(
      (resp) => {
        // console.log('resp =>>> ', resp)
        isLoggedIn = resp;
      }
    )
    return isLoggedIn;
  }
}
