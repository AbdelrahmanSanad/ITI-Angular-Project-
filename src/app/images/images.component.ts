import { Component, OnInit } from '@angular/core';
import { OurServiceService } from 'src/app/Services/our-service.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  imageList: any;
  constructor(public service: OurServiceService) {}

  ngOnInit() {
    this.service.getPhotos(3).subscribe({
      next: (data) => {
        this.imageList = data;
        console.log('first', this.imageList);
      },
      error: (err) => console.log(err),
    });
  }
}
