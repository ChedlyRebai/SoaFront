import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentComponent } from './Department/list-department/list-department.component';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { LoginComponent } from './login/login.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';

const routes: Routes = [
  {path:"onboarding",component:OnBoardingComponent},
  {path:"", component:EmployeeComponent},
  {path:"department",component:ListDepartmentComponent},
  {path:"login",component:LoginComponent},
  {path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
