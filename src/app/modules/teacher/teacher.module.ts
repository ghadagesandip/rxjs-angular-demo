import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TeacherRoutingModule } from './teacher-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list-teacher/list.component';
import { AddComponent } from './add-teacher/add.component';
import { EditComponent } from './edit-teacher/edit.component';
import { AcademicYearPipe } from './pipe/academic-year.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'; 

import {AuthGaurdService } from './guards/auth-guard.service';
import { CanDeactivateGuard } from './guards/can-deactivate-guard.service';
import { TeacherService } from './services/teacher.service';
import { DialogService } from './services/dialog.service';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    LayoutComponent, ListComponent, AddComponent, EditComponent, AcademicYearPipe, HeaderComponent, FooterComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    GridModule,
  ],
  providers: [
    TeacherService,
    AuthGaurdService,
    CanDeactivateGuard,
    DialogService
  ]
})
export class TeacherModule { }
