import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee.model';
import { Image } from '../models/Image.model';
import { AuthService } from './auth.service';

const  headers  = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  
apiURL: string = 'http://localhost:10001/api/employees';
apiImage:string='http://localhost:10001/api;'
constructor(private http : HttpClient,private authService:AuthService) {
  // if(environment.production){
  //   this.apiURL = environment.apiUrl + '/api/emplyees';
  // }else{
  //   this.apiURL= environment.apiUrl + '/api/employees';
  // }
}

private createHeaders(): HttpHeaders {
  const jwt = "Bearer " + this.authService.getToken();
  console.log(jwt);
  
  return new HttpHeaders({ "Authorization": jwt });
}

  listEmployees():Observable<Employee[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Employee[]>(this.apiURL,{headers:httpHeaders});
  }

  addEmployee( emp: Employee) :Observable<Employee>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Employee>(`${this.apiURL}/addemp`, emp, { headers:httpHeaders });
  }

  updateEmployee(emp: Employee):Observable<Employee>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Employee>(`${this.apiURL}/updateemp`, emp, { headers:httpHeaders });
  }

  findByContaininName(name : String):Observable<Employee[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Employee[]>(`${this.apiURL}/getname/${name}`,{ headers:httpHeaders })
  }

  deleteEmployee(id : number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiURL}/deleteemp/${id}`;
    return this.http.delete(url, { headers:httpHeaders });
  }

  consulterEmployee(id:number) :Observable<Employee>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiURL}/getemp/${id}`;
    return this.http.get<Employee>(url, { headers:httpHeaders });
  }



  


  uploadImage(file: File, filename: string): Observable<Image>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
   
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `http://localhost:10001/api/image/upload`;
    //http://localhost:10001/api/image/get/info/1
    console.log("upload image")
    console.log(imageFormData);
    console.log(file);
    console.log(filename);
    
    
    return this.http.post<Image>(url, imageFormData , { headers:httpHeaders });
    }


    loadImage(id: number): Observable<Image> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    console.log(jwt);
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
   
      const url = `http://localhost:10001/api/image/get/info/${id}`;
      let i:any =this.http.get<Image>(url);
      console.log(i);
      return this.http.get<Image>(url,{ headers:httpHeaders });
    }

    }
