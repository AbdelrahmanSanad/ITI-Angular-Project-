import { Component, Input, OnInit } from '@angular/core';
import { OurServiceService } from 'src/app/Services/our-service.service';
import { Router } from '@angular/router';
import{FormControl,FormGroup,Validators} from '@angular/forms'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

@Input() myUser:any;
  showForm:boolean= false;
  myUsers:any;

  constructor(private myRoute:Router , private userService:OurServiceService)
  {

  }
  ngOnInit(){

    this.userService.getUsers().subscribe(
      {
        next:(data)=>{
          console.log(data);
          this.myUsers=data;

        },
        error:(err)=>{console.log(err)}

      })
  }
  getForm()
  {
    this.showForm=true;
  }
  hidden()
  {
    this.showForm=false;
  }
  addUser(newUser:any)
  {
    this.myUsers.push({id: this.myUsers.length+1,...newUser});
  }
}
