import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  apiURL: string = 'http://localhost:8080/api/employees';
  constructor(private http : HttpClient) {
  }

  listEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiURL);
  }

  addEmployee( emp: Employee) :Observable<Employee>{
    return this.http.post<Employee>(this.apiURL, emp, httpOptions);
  }

  updateEmployee(emp: Employee):Observable<Employee>{
   
    return this.http.put<Employee>(this.apiURL, emp, httpOptions);
  }

  deleteEmployee(id : number){
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterEmployee(id:number) :Observable<Employee>{
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Employee>(url);
  }
}
