import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee.model';
import { EmployeeService } from 'src/app/service/employee.service';

import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Image } from 'src/app/models/Image.model';
import { AuthService } from 'src/app/service/auth.service';
import { ModalService } from 'src/app/service/modal.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  nameContain: String = '';
  constructor(
    private toast: HotToastService,
    public modalService: ModalService,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
      hasBackdrop: true,  
      data: {
        /* optional data to pass to the dialog component */
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.data == 'added') {
        this.toast.success('Employee added successfully');
        this.ngOnInit();
      }
    });
  }

  findByName() {
    
    if (`${this.nameContain}` === '') {
      this.ngOnInit();
    } else {
      this.employeeService
        .findByContaininName(`${this.nameContain}`)
        .subscribe((data) => {
          this.employees = data;
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
          console.log(data)
        });
    }
  }

  ngOnInit(): void {
    /*this.employeeService.listEmployees().subscribe((data) => {
    
      this.employees = data;

      this.employees.forEach((emp: Employee) => {
        if (emp.image) {
          this.employeeService
            .loadImage(emp.image.idImage)
            .subscribe((img: Image) => {
              emp.imageStr = 'data:' + img.type + ';base64,' + img.image;
              
            });
        }
      });
    });*/
 this.chargerEmployee();

  }

  chargerEmployee(){
    this.employeeService.listEmployees().subscribe((emp) => {
      console.log(this.employees)
    this.employees = emp;
    this.employees.forEach((emp:any) => {
    emp.imageStr = 'data:' + emp.images[0].type + ';base64,' +
    emp.images[0].image;
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
        id: employeeId,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.data == 'updated') {
        this.toast.success('Employee updated successfully');
        this.ngOnInit();
      }
    });

  }

  deleteEmployee(employeeId: number) {
    let dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: employeeId,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.toast.success('Employee deleted successfully');
      this.ngOnInit();
    });
  }
}
