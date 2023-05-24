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
  constructor(
    myRoute: ActivatedRoute,
    public OurService: OurServiceService,
    public router: Router
  ) {
    this.ID = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.OurService.getUserById(1).subscribe({
      next: (data) => {
        this.User = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.OurService.getAlbums(1).subscribe({
      next: (data) => {
        this.Albums = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
