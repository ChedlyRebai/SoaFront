import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee.model';
import { EmployeeService } from 'src/app/service/employee.service';

import { MatDialog } from '@angular/material/dialog';
import { Image } from 'src/app/models/Image.model';
import { AuthService } from 'src/app/service/auth.service';
import { ModalService } from 'src/app/service/modal.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[]=[]  ;
  nameContain:String = "";
  constructor(public modalService:ModalService,public authService:AuthService ,public dialog: MatDialog,private router: Router, private employeeService: EmployeeService) { 
       
  }

  

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
      hasBackdrop: true,
      data: { /* optional data to pass to the dialog component */ }
    });

    dialogRef.afterClosed().subscribe(res => {
      // received data from dialog-component
      if (res.data=='added'){
        this.employeeService.listEmployees().subscribe((data)=>{
          console.log(data);
          console.log('added')
          this.employees=data;
         })
      }
    })
  }

  findByName(){
    console.log(this.nameContain);
    if(`${this.nameContain}` === ''){
      this.ngOnInit();
    }else{
    this.employeeService.findByContaininName(`${this.nameContain}`).subscribe(
      (data)=>{
        this.employees=data
      }
    )
  }
  }

  // ngOnInit(): void {
  //   this.employeeService.listEmployees().subscribe((data)=>{
  //     console.log(data);
  //     this.employees=data;

  //     this.employees.forEach((emp:Employee) => {
  //       this.employeeService
  //       .loadImage(emp.image.idImage )
  //       .subscribe((img: Image) => {
  //         emp.image = 'data:' + img.type + ';base64,' + img.image;
  //       });
  //       });
  //    })
  // }

  ngOnInit(): void {
    this.employeeService.listEmployees().subscribe((data) => {
      console.log(data);
      this.employees = data;
  
      this.employees.forEach((emp: Employee) => {
        if (emp.image) {
          this.employeeService
            .loadImage(emp.image.idImage)
            .subscribe((img: Image) => {
              emp.imageStr = 'data:' + img.type + ';base64,' + img.image;
              console.log(emp.imageStr);
            });
        }
      });
    });
  }
  
  

  editEmployee(employeeId: number) {
    // Add your logic for editing an employee here
    console.log(`Editing employee with ID ${employeeId}`);
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      
      position: { top: '50%', left: '50%' },
      hasBackdrop: true, // Close the dialog when clicking outside
      data: {
        id: employeeId
       }
    });

    dialogRef.afterClosed().subscribe(res => {
      
      if (res.data=='updated'){
        this.router.navigate(['']);
        this.employeeService.listEmployees().subscribe((data)=>{
          console.log(data);
          console.log('update')
          this.employees=data;
         })
      }
    })
  }

  deleteEmployee(employeeId: number) {

    let dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: employeeId
    })
    dialogRef.afterClosed().subscribe(res => {  
      setTimeout(() => {

        this.employeeService.listEmployees().subscribe((data)=>{
          console.log(data);
          console.log('deleted')
          this.employees=data;
         })
        },300);
    })
  }


  
}
