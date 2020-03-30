import { Component, OnInit } from '@angular/core';
import { Teacher } from '../types/teacher';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  teachers: Teacher[];
  isAdmin: boolean;
  
  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    
    this.teacherService.getTeachersList().subscribe(
      (resp: Teacher[]) => {
        console.log('resp list', resp)
        this.teachers = resp
      }
    )
   
    this.authService.isAdmin().subscribe(
      (resp) => {
        this.isAdmin = resp;
      }
    );
  }

  edit(teacher) {
    this.router.navigate(['teachers/edit', teacher.id])
  }

 

}
