import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/Department.model';
import { Employee } from 'src/app/models/Employee.model';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
 
})
export class AddEmployeeComponent {
  employee:Employee={} as Employee;
  departments:Department[] = []
  departmentId:number=0;
  e:Employee={
    id: 9,
    firstName: "chedly",
    lastName: "rebai",
    email : "email@gmail.com",
    country: "country",
    position: "position",
    phoneNumber: "789",
    salary: 1000

  }
    
  constructor(private departmentService:DepartmentService, private route:Router, private employeeService: EmployeeService,
    
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    
  
    ) {
    this.departmentService.listDepartment().subscribe((data)=>{
      console.log(data);
      this.departments=data;
     })
   }
  onSubmit() {
    this.employee.department= this.departments.find((d)=>d.id==this.departmentId);
    this.employeeService.addEmployee(this.employee).subscribe((data)=>{
      console.log(data);
      this.dialogRef.close();
    })
  }
  onClose(){
    this.dialogRef.close();
  }

  onBackdropClick(): void {
    
     this.dialogRef.close();
  }
}
