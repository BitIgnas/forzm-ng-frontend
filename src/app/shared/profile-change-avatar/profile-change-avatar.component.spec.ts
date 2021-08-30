import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangeAvatarComponent } from './profile-change-avatar.component';

describe('ProfileChangeAvatarComponent', () => {
  let component: ProfileChangeAvatarComponent;
  let fixture: ComponentFixture<ProfileChangeAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileChangeAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
