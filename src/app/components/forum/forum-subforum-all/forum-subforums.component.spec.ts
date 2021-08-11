import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSubforumsComponent } from './forum-subforums.component';

describe('ForumSubforumsComponent', () => {
  let component: ForumSubforumsComponent;
  let fixture: ComponentFixture<ForumSubforumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSubforumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSubforumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
