import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSubforumComponent } from './forum-subforum.component';

describe('ForumSubforumComponent', () => {
  let component: ForumSubforumComponent;
  let fixture: ComponentFixture<ForumSubforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSubforumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSubforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
