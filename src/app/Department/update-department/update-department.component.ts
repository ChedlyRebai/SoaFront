import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from 'express';
import { Department } from 'src/app/models/Department.model';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent {
  departmentId:Department={} as Department;
  constructor(
    private departmentService:DepartmentService,
    private router: Router,  
    public dialogRef: MatDialogRef<UpdateDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      console.log(data.id);
    }


  onSubmit() {
    // this.employee.department= this.departments.find((d)=>d.id==this.departmentId);
    // this.employeeService.addEmployee(this.employee).subscribe((data)=>{
    //   console.log(data);
    //   this.dialogRef.close();
    // })

  }
  
  onClose(){
    this.dialogRef.close();
  }

  onBackdropClick(): void {
    
     this.dialogRef.close();
  }
}
