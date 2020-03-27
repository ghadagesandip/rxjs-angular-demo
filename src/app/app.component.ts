import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from './auth.service';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sandip';
  //isLoggedIn :boolean = !!localStorage.getItem('isLoggedIn') ;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.router.events
    .pipe(
      filter((evt: any) => evt instanceof RoutesRecognized),
      pairwise()
    )
    .subscribe((events: RoutesRecognized[]) => {
      //console.log('previous url', events[0].urlAfterRedirects);
      //console.log('current url', events[1].urlAfterRedirects);
      if(events[1].urlAfterRedirects != null && events[1].urlAfterRedirects != '/login'){
        // const subject = new Subject();
        // subject.subscribe(value=>{
          //console.log("localStorage.getItem('isLoggedIn') ", localStorage.getItem('isLoggedIn') )
          //this.isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
          //console.log('isLoggedIn :::', this.isLoggedIn)
          //console.log("subject subscribe");
        // })
      }

      if( events[1].urlAfterRedirects == '/login') {
        //console.log('logout called')
        localStorage.clear();
        //this.isLoggedIn = false;
      }
      
    });
  }
}
