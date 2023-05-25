import { Component, Input, OnInit, Output } from '@angular/core';
import { OurServiceService } from 'src/app/Services/our-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @Input() myUser: any;
  showForm: boolean = false;
  myUsers: any;
  sentUserToForm: any;

  myValidation = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/[a-zA-Z]+/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?20\s?(\d{2}|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/),
    ]),
    street: new FormControl('', [Validators.minLength(3), Validators.required]),
    suite: new FormControl('', [Validators.required]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/[a-zA-Z]+/),
    ]),
  });

  getData() {
    if (this.myValidation.valid) {
      this.myUsers.push({
        name: this.myValidation.value.name,
        email: this.myValidation.value.email,
        phone: this.myValidation.value.phone,
        address: {
          city: this.myValidation.value.city,
          street: this.myValidation.value.street,
          suite: this.myValidation.value.suite,
        },
      });
    }
  }

  nameNotValid() {
    return (
      this.myValidation.controls['name'].invalid &&
      this.myValidation.controls['name'].touched
    );
  }

  emailNotValid() {
    return (
      this.myValidation.controls['email'].invalid &&
      this.myValidation.controls['email'].touched
    );
  }
  phoneNotValid() {
    return (
      this.myValidation.controls['phone'].invalid &&
      this.myValidation.controls['phone'].touched
    );
  }
  streetNotValid() {
    return (
      this.myValidation.controls['street'].invalid &&
      this.myValidation.controls['street'].touched
    );
  }
  cityNotValid() {
    return (
      this.myValidation.controls['city'].invalid &&
      this.myValidation.controls['city'].touched
    );
  }
  suiteNotValid() {
    return (
      this.myValidation.controls['suite'].invalid &&
      this.myValidation.controls['suite'].touched
    );
  }
  constructor(
    private myRoute: Router,
    private userService: OurServiceService
  ) {}
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.myUsers = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getForm() {
    this.showForm = true;
  }
  hidden() {
    this.showForm = false;
  }

  addUser(newUser: any) {
    this.myUsers.push({ id: this.myUsers.length + 1, ...newUser });
  }
  // editing & Deleting

  getUserById(id: any) {
    for (const user of this.myUsers) {
      if (user.id == id) {
        this.sentUserToForm = user;
        // console.log(user);
        // console.log(this.sentUserToForm);
        return;
      }
    }
    this.getForm();
  }
  // editUser(id: any) {
  //   console.log('all users 👇🏼');
  //   console.log(this.myUsers);

  //   console.log('editing user = ' + id);
  // }

  dellUser(id: any) {
    this.myUsers.splice(id - 1, 1);
    for (let i = id - 1; i < this.myUsers.length; i++) {
      const element = this.myUsers[i];
      element.id = element.id - 1;
    }
    console.log('Deleted user = ' + id);
  }
}
