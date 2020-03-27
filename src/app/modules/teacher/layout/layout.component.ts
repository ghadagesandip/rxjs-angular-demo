import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  username: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserName().subscribe(
      (resp) => {
        this.username = resp;
      }
    )
  }

  logout() {
    this.authService.logout().subscribe(
      (resp) => {
        this.router.navigate(['login']);
      }
    )
  }

}
