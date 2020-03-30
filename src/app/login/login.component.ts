import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.isLoggedIn().subscribe(
      (resp) => {
        this.router.navigate(['teachers']);
      }
    )
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (resp: boolean)=> {
          if(resp) {
            this.router.navigate(['/teachers']);
          } else{
            this.errorMsg = 'Invalid login credentials';
          }
        }
      )
    } else {
      this.errorMsg = 'Invalid login details'
    }
  }
  
}
