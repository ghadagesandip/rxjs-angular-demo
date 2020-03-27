import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../types/teacher';
import { TeacherService } from '../../teacher.service';
import { Router } from '@angular/router';
import { ACADEMIC_YEARS } from './../../const/academic.years';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  teachers: ITeacher[];
  isAdmin: boolean;
  academicYears;
  constructor(
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.teacherService.getTeachersList().subscribe(
      (resp: ITeacher[]) => {
        this.teachers = resp
      }
    )
    this.academicYears = ACADEMIC_YEARS;
  }

  edit(teacher) {
    this.router.navigate(['teachers/edit', teacher.id])
  }

  yearChanged(value) {
    console.log('yearChanged', value)
    this.teacherService.getTeachersList(value).subscribe(
      (resp: ITeacher[]) => {
        this.teachers = resp
      }
    )
  }
}
