import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/Department.model';
import { AuthService } from 'src/app/service/auth.service';
import { DepartmentService } from 'src/app/service/department.service';
import { ModalService } from 'src/app/service/modal.service';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css'],
})
export class ListDepartmentComponent implements OnInit {
  departments: Department[] = [];
  catname?: String;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private departmentService: DepartmentService,
    public modalService:ModalService
  ) {}
  ngOnInit(): void {
    this.departmentService.listDepartment().subscribe((data) => {
      console.log(data);

      this.departments = data;
      console.log(this.departments);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      position: { top: '50%', left: '50%' },
      hasBackdrop: true, // Close the dialog when clicking outside
      data: {},
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.data == 'added') {
        this.departmentService.listDepartment().subscribe((data) => {
          console.log(data);
          console.log('added');
          this.departments = data;
        });
      }
    });
  }

  findByname() {
    console.log(this.catname);
    if (this.catname == '') {
      this.ngOnInit();
    } else {
      this.departmentService
        .findByContainName(`${this.catname}`)
        .subscribe((data: Department[]) => {
          this.departments = data;
        });
    }
  }

  editDepartment(departmentId: number) {
    console.log('department id' + departmentId);
    const dialogRef = this.dialog.open(UpdateDepartmentComponent, {
      hasBackdrop: true, // Close the dialog when clicking outside
      data: {
        id: departmentId,
      },
    });
    console.log('department id' + departmentId);
    dialogRef.afterClosed().subscribe((res) => {
      if (res.data == 'updated') {
        this.departmentService.listDepartment().subscribe((data) => {
          console.log(data);
          console.log('update');
          this.departments = data;
        });
      }
    });
  }

  deleteDepartment(employeeId: number) {

    let dialogRef = this.dialog.open(DeleteDepartmentComponent, {
      data: employeeId,
    });
    dialogRef.afterClosed().subscribe((res) => {
      // received data from dialog-component
      if (res.data == 'deleted') {
        this.departmentService.listDepartment().subscribe((updatedData) => {
          console.log(updatedData);
          console.log('updated');
          this.departments = updatedData;
        });
      }
    });
  }
}
