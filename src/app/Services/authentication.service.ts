import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private myUser: HttpClient) {}

  base_URL = 'http://localhost:3000';
  getUsers() {
    return this.myUser.get(this.base_URL + '/user');
  }
  getUserById(id: any) {
    return this.myUser.get(this.base_URL + '/user/' + id);
  }
  addNewUser(newUser: any) {
    return this.myUser.post(this.base_URL + '/user', {
      admin: false,
      ...newUser,
    });
  }
  getUserByEmail(email: any) {
    return this.myUser.get(this.base_URL + '/user?email=' + email);
  }
}
