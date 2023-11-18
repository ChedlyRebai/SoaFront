import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css']
})
export class DeleteDepartmentComponent {

constructor(@Inject(MAT_DIALOG_DATA)public data: number,
private dialogRef: MatDialogRef<DeleteDepartmentComponent>, private deparmentService: DepartmentService) { 
     
}


deleteDepartment(){
  
  this.deparmentService.deleteDepartment(this.data).subscribe((data)=>{
    this.dialogRef.close({ data: 'deleted' })
  })
  
}

onClose(){
  this.dialogRef.close();
}
}
