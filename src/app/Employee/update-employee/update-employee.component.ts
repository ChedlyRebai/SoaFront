import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/Department.model';
import { Employee } from 'src/app/models/Employee.model';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  employee:Employee={} as Employee;
  departments:Department[] = [];
  departmentId:number=0;
  constructor(private departmentService:DepartmentService, private route:Router, private employeeService: EmployeeService,
    
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>
    ,private activatedRoute:ActivatedRoute,private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      this.departmentService.listDepartment().subscribe((data)=>{
        
        this.departments=data;
        
        })
      console.log(data.id);
        this.employeeService.consulterEmployee(data.id).subscribe((data)=>{
          this.employee=data;
          console.log(this.employee);
        })
  }

  /*onSubmit() {
    console.log(this.employee);
      this.employeeService.updateEmployee(this.employee).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['employee']);
      })
  }*/

  
  onSubmit() {
    this.employee.department= this.departments.find((d)=>d.id==this.departmentId);
    this.employeeService.addEmployee(this.employee).subscribe((data)=>{
      console.log(data);
      this.dialogRef.close({ data: 'updated' })
      
    })
  }

  onClose(){
    this.dialogRef.close();
  }

  onBackdropClick(): void {
    
     this.dialogRef.close();
  }
}
