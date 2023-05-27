import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: any =
    sessionStorage.getItem('status') == 'true' ? true : false;
  constructor() {}
  isAuthenticated() {
    console.log(this.isLoggedIn);
    return this.isLoggedIn;
  }

  login() {
    this.isLoggedIn = true;
    console.log(this.isLoggedIn);
  }
  logout() {
    this.isLoggedIn = false;
    console.log(this.isLoggedIn);
  }
}
