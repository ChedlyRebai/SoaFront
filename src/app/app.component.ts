import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { ModalService } from './service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private router:Router,public authService: AuthService,public modalService:ModalService) {}
  title = 'site2';
  mouseEnter(div : string){
    console.log("mouse enter : " + div);
 }

 mouseLeave(div : string){
   console.log('mouse leave :' + div);
 }


 ngOnInit () {
  this.authService.loadToken();
  if (this.authService.getToken()==null ||
  this.authService.isTokenExpired()
  )
  this.router.navigate(['/login']);
  }
}
