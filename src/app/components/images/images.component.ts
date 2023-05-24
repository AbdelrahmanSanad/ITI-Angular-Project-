import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OurServiceService } from 'src/app/Services/our-service.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {

  albumId:any;
  imageList: any;
  userId:any;
  constructor(private service: OurServiceService, private myRoute:ActivatedRoute )
  {

    this.albumId = this.myRoute.snapshot.queryParams["albumId"];
    this.userId=this.myRoute.snapshot.queryParams["userId"];

  }



  ngOnInit() {
    this.service.getPhotos(this.albumId).subscribe({
      next: (data) => {
        this.imageList = data;
        console.log('first', this.imageList);
      },
      error: (err) => console.log(err),
    });

    // this.service.getUserById(this.userId).subscribe(
    //   {
    //     next:(data)=>
    //     {
    //       this.User=data;
    //       console.log(data);
    //     }
    //   })

  }
}
