import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css'],
})
export class VerifEmailComponent implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res:any) => {
        alert('Login successful');
        this.authService.login(this.user).subscribe({
          next: (data:any) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        if ((err.status = 400)) {
          this.err = err.error.message;
        }
        console.log(err.errorCode);
      },
    });
  }
}
