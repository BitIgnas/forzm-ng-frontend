import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListCardComponent } from './comment-list-card.component';

describe('CommentListCardComponent', () => {
  let component: CommentListCardComponent;
  let fixture: ComponentFixture<CommentListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
