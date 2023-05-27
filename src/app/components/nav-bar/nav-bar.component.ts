import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/routing-guard.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  admin: boolean = true;
  logged: any;

  constructor(private guard: AuthService) {}
  auth() {
    if (sessionStorage.getItem('status') == 'true') {
      return true;
    } else {
      return false;
    }
  }

  signOut() {
    sessionStorage.setItem('status', 'false');
    this.guard.logout();
  }
}
