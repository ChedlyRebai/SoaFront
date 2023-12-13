import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentComponent } from './Department/list-department/list-department.component';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { LoginComponent } from './login/login.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },
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
