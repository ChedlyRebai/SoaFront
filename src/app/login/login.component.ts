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

  message: string = 'login ou mot de passe erronés..';

  onLoggedi() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      },
    });
  }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.err = 1;
        if (err.error.errorCause == 'disabled')
          this.message =
            'Utilisateur désactivé, Veuillez contacter votre Administrateur';
      },
    });
  }
}
