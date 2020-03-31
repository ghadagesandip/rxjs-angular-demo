import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Teacher } from '../types/teacher';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';


import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { AddEvent, GridComponent, CellClickEvent } from '@progress/kendo-angular-grid'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {

  teachers: Teacher[];
  isAdmin: boolean = false;
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
    this.view = this.teacherService.getTeachersList()
    .pipe(
      map(data => {
        console.log('teachers fetched', data)
          return process(data, this.gridState)
        }
      )
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

  rowCallback = (context: RowClassArgs) => {
    return {
      showpointer: this.isAdmin,
    };
  }

  public onStateChange(state: State) {
    this.gridState = state;

    this.view = this.teacherService.getTeachersList().pipe(
      map(data => process(data, this.gridState))
    )
  }

  public clickHandler({ dataItem }: CellClickEvent): void {
    this.router.navigate(['teachers/edit', dataItem.id])
  }
}
