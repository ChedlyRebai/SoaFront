import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from 'express';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent {
  constructor(
    private departmentService:DepartmentService,
    private router: Router,  
    public dialogRef: MatDialogRef<UpdateDepartmentComponent>,

    ){}


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
