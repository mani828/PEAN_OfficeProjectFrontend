import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/authguard';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes: Routes = [
  {path:'',component:LoginComponent,},
  {path:'studentdetails',component:StudentDetailsComponent, canActivate:[AuthGuard]},
  {path:'add',component:AddComponent,canActivate:[AuthGuard]},
  {path:'update',component:AddComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
