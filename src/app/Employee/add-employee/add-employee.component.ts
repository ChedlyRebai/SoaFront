import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/Department.model';
import { Employee } from 'src/app/models/Employee.model';
import { Image } from 'src/app/models/Image.model';
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
  uploadedImage!: File;
imagePath: any;

  selectedFile: File | null = null;
    
  constructor(private departmentService:DepartmentService, private route:Router, private employeeService: EmployeeService,
    
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    
  
    ) {
    this.departmentService.listDepartment().subscribe((data)=>{
      console.log(data);
      this.departments=data;
     })
   }

  onSubmit() {


    this.employeeService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
    this.employee.image=img;
    console.log("image active")
    console.log(this.employee);
    this.employee.department= this.departments.find((d)=>d.id==this.departmentId);
    this.employeeService.addEmployee(this.employee).subscribe((data)=>{
      console.log(data);
     this.dialogRef.close({ data: 'added' })
      
    })
  })


  

   // this.employee.department= this.departments.find((d)=>d.id==this.departmentId);
    
  }
  onClose(){
    this.dialogRef.close();
  }

  onBackdropClick(): void {
    
     this.dialogRef.close();
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  onImageUpload(event: any) {

    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    console.log(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
 
}
