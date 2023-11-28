import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/Department.model';
import { Employee } from 'src/app/models/Employee.model';
import { Image } from 'src/app/models/Image.model';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = {} as Employee;
  departments: Department[] = [];
  departmentId: number = 0;
  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private route: Router,
    private employeeService: EmployeeService,

    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.departmentService.listDepartment().subscribe((data) => {
      this.departments = data;
    });

    console.log(data.id);
    this.employeeService.consulterEmployee(data.id).subscribe((data) => {
      this.employee = data;
      console.log(this.employee);
    });

    this.employeeService
      .loadImage(data.id as number)
      .subscribe((data: Image) => {
        this.myImage = 'data:' + data.type + ';base64,' + data.image;
        console.log(this.myImage);
      });
  }
  ngOnInit(): void {
    console.log(this.data.id);
    this.employeeService.consulterEmployee(this.data.id).subscribe((data) => {
      this.employee = data;
      console.log(this.employee);
    });

    this.employeeService
      .loadImage(this.data.id as number)
      .subscribe((data: Image) => {
        this.myImage = 'data:' + data.type + ';base64,' + data.image;
        console.log(this.myImage);
      });
  }

  /*onSubmit() {
    console.log(this.employee);
      this.employeeService.updateEmployee(this.employee).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['employee']);
      })
  }*/

  onSubmit() {
    this.employee.department = this.departments.find(
      (d) => d.id == this.departmentId
    );

    if (this.isImageUpdated) {
      this.employeeService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.employee.image = img;
          this.employeeService
            .updateEmployee(this.employee)
            .subscribe((prod) => {
              this.dialogRef.close({ data: 'updated' });
            //  this.router.navigate(['produits']);
            });
        });
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe((prod) => {
        this.dialogRef.close({ data: 'updated' });
        //this.router.navigate(['']);
      });
    }
    // this.employeeService.addEmployee(this.employee).subscribe((data) => {
    //   console.log(data);
    //   this.dialogRef.close({ data: 'updated' });
    // });
  }

  onClose() {
    this.dialogRef.close();
  }

  onBackdropClick(): void {
    this.dialogRef.close();
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
}
