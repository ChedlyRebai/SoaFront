import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/Department.model';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent {
   departmentId:number=0;
   department:Department={} as Department;
   constructor(
     private departmentService:DepartmentService,
     private router: Router,  
     public dialogRef: MatDialogRef<UpdateDepartmentComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
     ){
      this.departmentId=data.id;
      console.log(data.id);
      this.departmentService.getDepartment(data.id).subscribe((data)=>{
            this.department=data;
          console.log(this.department)
        });
     }


  onSubmit() {
   /*this.employee.department= this.departments.find((d)=>d.id==this.departmentId);
   this.employeeService.addEmployee(this.employee).subscribe((data)=>{
     console.log(data);
     this.dialogRef.close();
  })*/
  this.department={
    id:7,
    name:"ched",
    description:"77",
    location:"88"
    
  }
    this.departmentService.updateDepartment(7,this.department).subscribe((data)=>{
      console.log(data);
      console.log(this.department)
      
      this.dialogRef.close();
    });
  }
  
  onClose(){
    this.dialogRef.close();
  }

  onBackdropClick(): void {
     this.dialogRef.close();
  }
}
