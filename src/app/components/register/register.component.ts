import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // User Property is used to store The input data in it
  user: any;
  allUsers: any;
  emailRepeated = false;
  constructor(private auth: AuthenticationService, private myRoute: Router) {}
  // To fitch All users Data On iniit
  ngOnInit(): void {
    this.auth.getUsers().subscribe({
      next: (data) => {
        this.allUsers = data;
      },
    });
  }

  //Form Control
  userForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d|.*[A-Za-z])[A-Za-z\d]{4,}$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });

  // When clicking Register
  addUser() {
    const registerRes = document.getElementById('register-res');
    const msg = document.createElement('p');

    if (this.userForm.valid) {
      for (let user of this.allUsers) {
        if (user.email == this.userForm.controls['email'].value) {
          this.emailRepeated = true;
          return;
        }
      }
      this.emailRepeated = false;
      this.user = {
        email: this.userForm.controls['email'].value,
        username: this.userForm.controls['username'].value,
        password: this.userForm.controls['password'].value,
      };
      this.auth.addNewUser(this.user).subscribe();
      this.userForm.patchValue({
        username: '',
        password: '',
        email: '',
      });
      this.myRoute.navigate(['/login']);
    }
  }
  //this Functions id related to the validation of our code to show specific tag in case of the inputs not Valid
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
  usernameNotValid() {
    return (
      this.userForm.controls['username'].invalid &&
      this.userForm.controls['username'].touched
    );
  }
}
