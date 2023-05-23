import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class OurServiceService {

  base_URL='https://jsonplaceholder.typicode.com/users';
  album_URL="https://jsonplaceholder.typicode.com/albums?userId=";
  photos_URL="https://jsonplaceholder.typicode.com/photos?albumId=";
  constructor(private myService:HttpClient)
  {

  }
   getUsers()
    {
      return this.myService.get(this.base_URL);
    }
    getUserById(id:any)
    {
      return this.myService.get(this.base_URL+'/'+id);
    }
    getAlbums(id:any)
    {
      return this.myService.get(this.album_URL+id);
    }
    getPhotos(id:any)
    {
      return this.myService.get(this.photos_URL+id);
    }
}
