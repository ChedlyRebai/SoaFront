import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEmployeeComponent } from 'src/app/Employee/add-employee/add-employee.component';
import { Department } from 'src/app/models/Department.model';
import { DepartmentService } from 'src/app/service/department.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  department:Department={} as Department;
  constructor(
    private departmentService:DepartmentService,
    private router: Router,  
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    ){
  }

 
    
 
  onSubmit() {
    // this.employee.department= this.departments.find((d)=>d.id==this.departmentId);
    // this.employeeService.addEmployee(this.employee).subscribe((data)=>{
    //   console.log(data);
    //   this.dialogRef.close();
    // })

    this.departmentService.addDepartment(this.department).subscribe((data)=>{
      console.log(data);
      this.dialogRef.close({ data: 'added' }) 
    })
  }
  onClose(){
    this.dialogRef.close();
  }

  onBackdropClick(): void {
    
     this.dialogRef.close();
  }
}
