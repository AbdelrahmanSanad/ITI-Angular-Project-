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
  // properties
  myUsers: any;
  sentUserToForm: any;
  newUser: boolean = false;
  showPopUp: boolean = false;
  userId: any;
  show: boolean = false;
  admin: boolean = true;
  // #######################################

  constructor(
    private myRoute: Router,
    private userService: OurServiceService
  ) {}

  // Form Validation
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
    phone: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.minLength(3), Validators.required]),
    suite: new FormControl('', [Validators.required]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/[a-zA-Z]+/),
    ]),
  });

  // If Field not valid
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
  // ##########################################

  // Get Users list from Api
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        //console.log(data);
        this.myUsers = data;
      },
      error: (err) => {
        //console.log(err);
      },
    });
  }
  // #################################

  pushNewUser() {
    const submitMsg = document.createElement('p');
    submitMsg.style.cssText = `
    color: Green;
    margin: 0;
`;
    const submitMsgElement = document.getElementById(
      'submit-msg'
    ) as HTMLElement;

    if (this.myValidation.valid) {
      this.myUsers.push({
        id: this.myUsers.length + 1,
        name: this.myValidation.value.name,
        email: this.myValidation.value.email,
        phone: this.myValidation.value.phone,
        address: {
          city: this.myValidation.value.city,
          street: this.myValidation.value.street,
          suite: this.myValidation.value.suite,
        },
      });
      submitMsg.textContent = `User ${this.myValidation.value.name} Added Successfuly`;

      this.myValidation.markAsUntouched();
      this.myValidation.patchValue({
        name: '',
        email: '',
        phone: '',
        city: '',
        suite: '',
        street: '',
      });
    } else {
      submitMsg.style.cssText = `
    color: red;
    margin: 0;
`;
      submitMsg.textContent = `Problem Occurred`;
    }

    return submitMsgElement?.replaceWith(submitMsg);
  }

  addNewUserBtn() {
    this.showPopUp = true;
    this.newUser = true;
    this.myValidation.patchValue({
      name: '',
      email: '',
      phone: '',
      city: '',
      suite: '',
      street: '',
    });
  }

  saveBtnClicked() {
    if (this.newUser) {
      this.pushNewUser();
    } else {
      this.submitEditing();
    }
    return;
  }

  //##################### Edit user #####################
  editUserBtn(user: any) {
    this.showPopUp = true;
    this.newUser = false;

    this.myValidation.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
      suite: user.address.suite,
      street: user.address.street,
    });
    this.userId = user.id;
  }

  submitEditing() {
    const submitMsg = document.createElement('p');
    submitMsg.style.cssText = `
    color: Green;
    margin: 0;
`;
    const submitMsgElement = document.getElementById(
      'submit-msg'
    ) as HTMLElement;

    if (this.myValidation.valid) {
      const newObj = {
        id: this.userId,
        name: this.myValidation.value.name,
        email: this.myValidation.value.email,
        phone: this.myValidation.value.phone,
        address: {
          city: this.myValidation.value.city,
          street: this.myValidation.value.street,
          suite: this.myValidation.value.suite,
        },
      };

      // Replacing one Object with the new Obj in the Array
      this.myUsers.splice(this.userId - 1, 1, newObj);
      submitMsg.textContent = `User ${this.myValidation.value.name} Updated Successfuly`;
    } else {
      submitMsg.style.cssText = `
    color: red;
    margin: 0;
`;
      submitMsg.textContent = `Problem Occurred`;
    }

    return submitMsgElement.replaceWith(submitMsg);
  }

  //##################### Delete user #####################

  deleteUserBtn(id: any) {
    this.show = true;
    this.userId = id;
  }

  yesDell() {
    this.myUsers.splice(this.userId - 1, 1);
    for (let i = this.userId - 1; i < this.myUsers.length; i++) {
      const element = this.myUsers[i];
      element.id = element.id - 1;
    }
    // console.log('Deleted user = ' + this.userId);
    this.show = false;
  }

  noDell() {
    this.show = false;
  }
  // ##############################################
  hideFormOnBgClick(e: MouseEvent) {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.id == 'myForm') {
      this.showPopUp = false;
    }
  }

  hideDellOnBgClick(e: MouseEvent) {
    const clickedElement = e.target as HTMLElement;
    //console.log(clickedElement);

    if (clickedElement.id == 'con-bg') {
      this.show = false;
    }
  }

  auth() {
    if (sessionStorage.getItem('admin') === 'false') {
      return false;
    } else {
      return true;
    }
  }
}
