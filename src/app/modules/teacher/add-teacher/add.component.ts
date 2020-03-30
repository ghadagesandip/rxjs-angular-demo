import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { ACADEMIC_YEARS } from '../const/academic.years';
import { DialogService } from '../services/dialog.service';
import { Observable } from 'rxjs';
import { AcademicYear } from '../types/academic.years.type';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  errorMsg: string;
  academic_years:AcademicYear[];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.academic_years = ACADEMIC_YEARS
    this.createLoginForm();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if ( this.addForm.dirty) {

      return this.dialogService.confirm('Discard changes for teacher?');
    }
    return true;
  }

  
  createLoginForm(){
    this.addForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      academic_year: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0), Validators.max(40)]]
    });
  }


  onSubmit() {
    if(this.addForm.valid) {
      this.submitted = true;
      this.teacherService.addTeacherToList(this.addForm.value).subscribe(
        (resp: boolean)=> {
          if(resp) {
            this.router.navigate(['/teachers']);
          } else{
            this.errorMsg = 'Invalid login credentials';
          }
        }
      )
    } else {
      this.errorMsg = 'validation error'
    }
  }

}
