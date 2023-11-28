import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = new User();
  err: number = 0;
  erreur = 0;
  constructor(public authService: AuthService, private router: Router) {}
  

  onLoggedin()
    {
      this.authService.login(this.user).subscribe({
        next: (data) => {
          let jwToken = data.headers.get('Authorization')!;
          this.authService.saveToken(jwToken);
           this.router.navigate(['/']); 
        },
        error: (err: any) => {
        this.err = 1; 
        }
        });  
    }


}
