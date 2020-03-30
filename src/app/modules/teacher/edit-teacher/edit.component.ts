import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Teacher } from '../types/teacher';
import { ACADEMIC_YEARS } from '../const/academic.years';
import { DialogService } from '../services/dialog.service';
import { Observable } from 'rxjs';
import { AcademicYear } from '../types/academic.years.type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  errorMsg: string;
  academic_years:AcademicYear[];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService
  ) { }

  canDeactivate(): Observable<boolean> | boolean {

    if ( this.editForm.dirty && !this.submitted ) {
      return this.dialogService.confirm('Discard changes for teacher?');
    }
    return true;
  }

  ngOnInit(): void {
   this.academic_years = ACADEMIC_YEARS;
    this.createLoginForm();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.setFormData(id);
  }

  createLoginForm(){
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      academic_year: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  setFormData(id: number) {
    
    this.teacherService.getTeacherById(id).subscribe(
      (val: Teacher) => {
        this.editForm.patchValue({
          id: val.id,
          first_name: val.first_name,
          last_name: val.last_name,
          academic_year: val.academic_year,
          experience: val.experience
        })
      }
    )
    
  }

  onSubmit() {
    if(this.editForm.valid) {
      this.submitted = true;
      this.teacherService.updateTeacherfromList(this.editForm.value).subscribe(
        (resp: boolean)=> {
          if(resp) {
            this.router.navigate(['/teachers']);
          } else{
            this.errorMsg = 'Error while updating data';
          }
        }
      )
    } else {
      this.errorMsg = 'validation error'
    }
  }

}
