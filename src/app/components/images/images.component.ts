import { Component, OnChanges, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { OurServiceService } from 'src/app/Services/our-service.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  albumId: any;
  imageList: any;
  currentRoute: any;

  constructor(
    private router: Router,
    private service: OurServiceService,
    private myRoute: ActivatedRoute
  ) {
    // get album id from url
    this.albumId = this.myRoute.snapshot.params['id'];
    // keep track with url change
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        let url = event.url.split('/');
        let id = url[url.length - 1];
        this.getAlbumPhotos(id);
      }
    });
  }
  // fetching images
  getAlbumPhotos(id: any) {
    this.service.getPhotos(id).subscribe({
      next: (data) => {
        this.imageList = data;
      },
      error: (err) => console.log(err),
    });
  }
  // get album images when the image component called for the first time
  ngOnInit() {
    this.getAlbumPhotos(this.albumId);
  }
}
