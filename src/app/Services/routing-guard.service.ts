import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: any =
    sessionStorage.getItem('status') == 'true' ? true : false;
  constructor() {}
  isAuthenticated() {
    return this.isLoggedIn;
  }

  login() {
    this.isLoggedIn = true;
  }
  logout() {
    this.isLoggedIn = false;
  }
}
