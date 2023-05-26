import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public isLoggedIn:any =sessionStorage.getItem('status')?true:false;
  constructor() { }
isAuthenticated(){
    console.log(this.isLoggedIn);
    return this.isLoggedIn;

  }


  canLogin()
  {
    this.isLoggedIn=true;
    console.log(this.isLoggedIn);
  }
}
