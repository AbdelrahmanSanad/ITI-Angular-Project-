import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  admin:boolean=true
  logged:any;


  auth()
  {
    if(sessionStorage.getItem('status') == 'true')
    {
      return true
    }
    else
    {
      return false
    }
  }

  signOut()
  {
    sessionStorage.setItem('status','false')
  }
}
