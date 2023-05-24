import { Component, OnInit } from '@angular/core';
import { OurServiceService } from 'src/app/Services/our-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  myUsers:any;
  constructor(private userService:OurServiceService)
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
}
