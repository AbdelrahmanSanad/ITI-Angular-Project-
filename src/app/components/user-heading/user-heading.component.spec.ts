import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeadingComponent } from './user-heading.component';

describe('UserHeadingComponent', () => {
  let component: UserHeadingComponent;
  let fixture: ComponentFixture<UserHeadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserHeadingComponent]
    });
    fixture = TestBed.createComponent(UserHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
