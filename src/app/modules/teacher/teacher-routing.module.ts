import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { AuthGaurdService } from './guards/auth-guard.service';
import { AdminGuardService } from './guards/admin.guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGaurdService],
    children: [
      {
        path:'',
        component: ListComponent
      },
      {
        path:'new',
        component: AddComponent,
        canActivate:[AdminGuardService]
      },
      {
        path:'edit/:id',
        component: EditComponent,
        canActivate:[AdminGuardService]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
