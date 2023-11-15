import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent {

  constructor(@Inject(MAT_DIALOG_DATA)public data: number,
  private dialogRef: MatDialogRef<DeleteEmployeeComponent>, private employeeService: EmployeeService) { 
       
  }


  deleteUser(){
    this.employeeService.deleteEmployee(this.data).subscribe((data)=>{console.log(data)})
    this.dialogRef.close({ data: 'deleted' })
  }

  onClose(){
    this.dialogRef.close();
  }
}
