import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  profile:Boolean = false;
  constructor() { }

  toggleProfile(){
    this.profile = !this.profile;
  }
}
