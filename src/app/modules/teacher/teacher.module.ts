import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { TeacherService } from './teacher.service';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthGaurdService } from './guards/auth-guard.service';
import { AcademicYearPipe } from './pipe/academic-year.pipe'; 

@NgModule({
  declarations: [
    LayoutComponent, ListComponent, AddComponent, EditComponent, AcademicYearPipe
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule
  ],
  providers: [TeacherService, AuthGaurdService]
})
export class TeacherModule { }
