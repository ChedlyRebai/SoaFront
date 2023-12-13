import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { AddDepartmentComponent } from './Department/add-department/add-department.component';
import { DeleteDepartmentComponent } from './Department/delete-department/delete-department.component';
import { ListDepartmentComponent } from './Department/list-department/list-department.component';
import { UpdateDepartmentComponent } from './Department/update-department/update-department.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './Employee/delete-employee/delete-employee.component';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ManageImagesComponent } from './manage-images/manage-images.component';
@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    AddDepartmentComponent,
    EmployeeComponent,
    ListDepartmentComponent,
    UpdateEmployeeComponent,
    DeleteEmployeeComponent,
    DeleteDepartmentComponent,
    UpdateDepartmentComponent,
    LoginComponent,
    OnBoardingComponent,
    RegisterComponent,
    VerifEmailComponent,
    ManageImagesComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HotToastModule.forRoot(),
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
