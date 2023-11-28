import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Department } from '../models/Department.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class DepartmentService  {

  apiURL: string = 'http://localhost:10001/api/departments';
 
constructor(private http : HttpClient,private authService:AuthService) {
 /* if(environment.production){
    this.apiURL = environment.apiUrl + '/api/departments';
  }else{
    this.apiURL= environment.apiUrl + '/api/departments';
  }*/
}

private createHeaders(): HttpHeaders {
  const jwt = "Bearer " + this.authService.getToken();
  console.log(jwt);
  
  return new HttpHeaders({ "Authorization": jwt });
}

addDepartment(dep:Department):Observable<Department>{
  
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
  
  return this.http.post<Department>(`${this.apiURL}/adddep`, dep , { headers:httpHeaders });
}

listDepartment():Observable<Department[]>{
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Department[]>(this.apiURL,{headers:httpHeaders});
}


deleteDepartment(id : number){
  
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url = `${this.apiURL}/deletedep/${id}`;
  return this.http.delete(url, { headers:httpHeaders });
}

getDepartment(id : number):Observable<Department>{
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url = `${this.apiURL}/getdep/${id}`;
  return this.http.get<Department>(url,{headers:httpHeaders});
}


updateDepartment(id:number,department : Department):Observable<Department>{
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
  
  console.log(department);

  return this.http.put<Department>(`${this.apiURL}/updatedep/${id}`,department,{headers:httpHeaders});
}


findByContainName(name : String):Observable<Department[]>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  console.log(jwt);
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Department[]>(`${this.apiURL}/getname/${name}`,{ headers:httpHeaders })
}
}
