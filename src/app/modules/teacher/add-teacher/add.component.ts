import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { ACADEMIC_YEARS } from '../const/academic.years';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  errorMsg: string;
  academic_years;
  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.academic_years = ACADEMIC_YEARS
    this.createLoginForm();
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
    console.log('this.addForm', this.addForm.value)
    if(this.addForm.valid) {
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
