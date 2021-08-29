import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSubforumPostComponent } from './forum-subforum-post.component';

describe('ForumSubforumPostComponent', () => {
  let component: ForumSubforumPostComponent;
  let fixture: ComponentFixture<ForumSubforumPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSubforumPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSubforumPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
