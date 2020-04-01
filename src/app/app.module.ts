import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AuthService } from './login/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseService } from './modules/teacher/services/cache-route-reuse.strategy';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
