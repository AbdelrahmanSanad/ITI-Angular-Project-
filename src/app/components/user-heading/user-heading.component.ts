import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-heading',
  templateUrl: './user-heading.component.html',
  styleUrls: ['./user-heading.component.css'],
})
export class UserHeadingComponent {
  @Input() user: any;
}
