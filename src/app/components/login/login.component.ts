import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  allUsers: any;
  constructor(private auth: AuthenticationService, private myRoute: Router) {}

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
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/),
    ]),
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
            console.log('Secure');
            console.log(userData);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
