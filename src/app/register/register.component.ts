import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err!:any;
  loading : boolean = false;


  constructor(private formBuilder: FormBuilder, private authService : AuthService,
    private router:Router
    ) {}
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onRegister() {
    this.user.username = this.myForm.value.username;
  this.user.email = this.myForm.value.email;
  this.user.password = this.myForm.value.password;
    console.log(this.user);
    this. authService.setRegistredUser(this.user);
    alert("veillez confirmer votre email");
    this.router.navigate(["/verifEmail"]);
  }
}
