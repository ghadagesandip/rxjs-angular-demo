import { Component, OnInit } from '@angular/core';
import { Teacher } from '../types/teacher';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';


import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  teachers: Teacher[];
  isAdmin: boolean;
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  
  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // this.teacherService.getTeachersList().subscribe(
    //   (resp: Teacher[]) => {
    //     this.teachers = resp
    //   }
    // )

    this.view = this.teacherService.getTeachersList().pipe(
      map(data => process(data, this.gridState))
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

  public onStateChange(state: State) {
    this.gridState = state;

    this.view = this.teacherService.getTeachersList().pipe(
      map(data => process(data, this.gridState))
    )
}
 

}
