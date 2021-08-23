import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCommentListComponent } from './feed-comment-list.component';

describe('FeedCommentListComponent', () => {
  let component: FeedCommentListComponent;
  let fixture: ComponentFixture<FeedCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedCommentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
