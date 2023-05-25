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
