import { Component, OnInit } from '@angular/core';
import { AcademicYear } from './../../types/academic.years.type';
import { AuthService } from 'src/app/login/auth.service';
import { ACADEMIC_YEARS } from './../../const/academic.years';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  academicYears: AcademicYear[];
  isAdmin: boolean;
  username: string;

  constructor(
    private authService: AuthService,
    private teacherService: TeacherService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(
      (resp) => {
        this.isAdmin = resp;
      }
    );
    this.academicYears = ACADEMIC_YEARS;
    this.authService.getUserName().subscribe(
      (resp) => {
        this.username = resp;
      }
    )
  }

  yearChanged(value) {
    this.teacherService.filterTeachers(value)
  }
 
  logout() {
    this.authService.logout().subscribe(
      (resp) => {
        this.router.navigate(['login']);
      }
    )
  }
}
