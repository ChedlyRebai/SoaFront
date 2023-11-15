import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentComponent } from './Department/list-department/list-department.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { EmployeeComponent } from './Employee/employee/employee.component';

const routes: Routes = [
  {path:"addemployee",component:AddEmployeeComponent},
  {path:"",component:EmployeeComponent},
  {path:"department",component:ListDepartmentComponent},
  {path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
