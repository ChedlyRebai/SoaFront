import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/Department.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class DepartmentService  {
  apiURL: string = 'http://localhost:8080/api/departments';
constructor(private http : HttpClient) {

}

addDepartment(dep:Department):Observable<Department>{
  return this.http.post<Department>(this.apiURL, dep , httpOptions);
}

listDepartment():Observable<Department[]>{
  return this.http.get<Department[]>(this.apiURL);
}


deleteDepartment(id : number){
  const url = `${this.apiURL}/${id}`;
  return this.http.delete(url, httpOptions);
}

updateDepartment(department : Department):Observable<Department>{
  return this.http.put<Department>(this.apiURL, department, httpOptions);
}

}
