import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Department } from '../models/Department.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class DepartmentService  {

  apiURL: string = '';
 
constructor(private http : HttpClient) {
  if(environment.production){
    this.apiURL = environment.apiUrl + '/api/departments';
  }else{
    this.apiURL= environment.apiUrl + '/api/departments';
  }
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

getDepartment(id : number):Observable<Department>{
  const url = `${this.apiURL}/${id}`;
  return this.http.get<Department>(url);
}


updateDepartment(id:number,department : Department):Observable<Department>{
  const url = `http://localhost:8080/api/departments/7`;
  console.log(url);
  console.log(department);
  return this.http.put<Department>(this.apiURL,department);
}

}
