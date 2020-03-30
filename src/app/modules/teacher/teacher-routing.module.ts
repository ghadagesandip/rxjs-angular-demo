import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list-teacher/list.component';
import { AddComponent } from './add-teacher/add.component';
import { EditComponent } from './edit-teacher/edit.component';
import { AuthGaurdService } from './guards/auth-guard.service';
import { AdminGuardService } from './guards/admin.guard.service';
import { CanDeactivateGuard } from './guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGaurdService],
    children: [
      {
        path:'',
        component: ListComponent,
        data: {
          reuse: true
        }
      },
      {
        path:'new',
        component: AddComponent,
        canActivate:[AdminGuardService],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path:'edit/:id',
        component: EditComponent,
        canActivate:[AdminGuardService],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
