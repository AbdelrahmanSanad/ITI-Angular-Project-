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
  //this Function is declared to fitch the data

  // This Fnction is Implemented to Add THe New Regestiered User To the Database
  addUser() {
    if (this.userForm.valid) {

      // console.log(this.allUsers)
      for (let myUser of this.allUsers) {
        if (myUser.email == this.userForm.controls['email'].value) {

          this.emailRepeated = true;
          return
        }
      }
          this.emailRepeated = false;
          this.user = {
            email: this.userForm.controls['email'].value,
            username: this.userForm.controls['username'].value,
            password: this.userForm.controls['password'].value,
          };
          this.auth.addNewUser(this.user).subscribe();
          this.userForm.patchValue(
            {
              username:'',
              password:'',
              email:''
            })
            // this.myRoute.navigateByUrl('/login')
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
