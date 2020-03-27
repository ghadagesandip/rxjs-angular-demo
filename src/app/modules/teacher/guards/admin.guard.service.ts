import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthService) {
   
  }

  canActivate(): boolean {

    let isadmin: boolean;
    this.authService.isAdmin().subscribe(
      (resp) => {
        isadmin = resp;
      }
    )
    return isadmin;
  }
}
