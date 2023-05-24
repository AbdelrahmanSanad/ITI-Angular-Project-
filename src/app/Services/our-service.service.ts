import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class OurServiceService {
  private readonly base_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly myService: HttpClient) {}
  getUsers() {
    return this.myService.get(this.base_URL + '/users');
  }
  getUserById(id: any) {
    return this.myService.get(this.base_URL + '/users/' + id);
  }
  getAlbums(id: any) {
    return this.myService.get(this.base_URL + '/albums?userId=' + id);
  }
  getPhotos(id: any) {
    return this.myService.get(this.base_URL + '/photos?albumId=' + id);
  }
}
