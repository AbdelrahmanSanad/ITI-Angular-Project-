import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/routing-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signIn: boolean = true;
  allUsers: any;
  constructor(
    private auth: AuthenticationService,
    private myRoute: Router,
    private guard: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.getUsers().subscribe({
      next: (data: any) => {
        this.allUsers = data;
      },
    });
  }

  // Form Validation
  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      ),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  emailNotValid() {
    return (
      this.userForm.controls['email'].invalid &&
      this.userForm.controls['email'].touched
    );
  }

  passwordNotValid() {
    return (
      this.userForm.controls['password'].invalid &&
      this.userForm.controls['password'].touched
    );
  }
  // ---------------------------------------------
  login() {
    if (this.userForm.valid) {
      const email = this.userForm.controls['email'].value;
      const pass = this.userForm.controls['password'].value;
      this.auth.getUserByEmail(email).subscribe({
        next: (userData: any) => {
          if (userData[0].password == pass) {
            this.guard.login();
            sessionStorage.setItem('status', 'true');
            this.signIn = true;
            this.myRoute.navigateByUrl('/users');
            if (userData[0].admin === true) {
              sessionStorage.setItem('admin', 'true');
            } else {
              sessionStorage.setItem('admin', 'false');
            }
          } else {
            //Invalid Sign in Response
            this.signIn = false;
          }
        },
        error: (error: any) => {},
      });
    }
  }

  mySign() {
    if (this.signIn === false) {
      return true;
    } else {
      return false;
    }
  }
}
