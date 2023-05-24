import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OurServiceService } from 'src/app/Services/our-service.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  ID: any;
  User: any;
  Albums: any;
  AlbumsImages: any[] = [];
  constructor(
    myRoute: ActivatedRoute,
    public OurService: OurServiceService,
    public router: Router
  ) {
    this.ID = myRoute.snapshot.params['id'];
  }
  // get images of each album
  getAlbumImages(id: any) {
    this.OurService.getPhotos(id).subscribe({
      next: (photos) => {
        this.AlbumsImages.push({ id, data: photos });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    // get user information
    this.OurService.getUserById(this.ID).subscribe({
      next: (data) => {
        this.User = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // get user albums
    this.OurService.getAlbums(this.ID).subscribe({
      next: (data) => {
        this.Albums = data;
        // get images related to each album
        this.Albums.forEach((album: { id: any }) => {
          this.getAlbumImages(album.id);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
