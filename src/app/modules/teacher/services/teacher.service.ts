import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Teacher } from '../types/teacher';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  initialTeachers : Teacher[] = [
    {
      id: 1,
      first_name:'Max',
      last_name: 'Rodridge',
      academic_year: 2,
      experience: 5
    },
    {
      id: 2,
      first_name:'Peter',
      last_name: 'Valley',
      academic_year: 1,
      experience: 6
    }
  ];
  teachers: BehaviorSubject<Teacher[]> = new BehaviorSubject<Teacher[]>(this.initialTeachers);

  constructor() { }

  getTeachersList (): Observable<Teacher[]> {
    return this.teachers.pipe(delay(2000));
  }

  addTeacherToList(newTeacher: Teacher): Observable<boolean> {

    const teachers = this.teachers.getValue();
    const latestTeacherId = teachers.length ? teachers[teachers.length-1].id +1: 0;
    newTeacher.id = latestTeacherId;
    teachers.push(newTeacher);
    this.teachers.next(teachers);
    return of(true).pipe(delay(2000));
  }

  updateTeacherfromList(updatedTeacher: Teacher): Observable<boolean> {
    const existingTeachers = this.teachers.getValue();
    let _index=null;
    existingTeachers.find((teacher, index) => {
      if(teacher.id === updatedTeacher.id) {
        _index  = index;
        return true;
      }
    })
    if(_index >=0) {
      existingTeachers[_index] = updatedTeacher;
      this.teachers.next(existingTeachers);
      return of(true).pipe(delay(2000));
    } else {
      return of(false).pipe(delay(2000));
    }   
  }


  getTeacherById(id: number): Observable<Teacher> {
    const teachers = this.teachers.getValue();
    const teacher = teachers.filter((teacher) => {
      return teacher.id === id
    })
   return of(teacher[0]);
  }

  filterTeachers(academicYearId: number): void {
   if(academicYearId) {
    const filtredResult = this.initialTeachers.filter((teacher: any) => {
       return teacher.academic_year == academicYearId;
    })
    this.teachers.next(filtredResult)
   } else{
    this.teachers.next(this.initialTeachers)
   }
  }
}
