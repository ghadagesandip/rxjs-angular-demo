import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from './login/auth.service';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sandip';

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.router.events
    .pipe(
      filter((evt: any) => evt instanceof RoutesRecognized),
      pairwise()
    )
    .subscribe((events: RoutesRecognized[]) => {
     
      if( events[1].urlAfterRedirects == '/login') {
        localStorage.clear();
      }
    });
  }
}
