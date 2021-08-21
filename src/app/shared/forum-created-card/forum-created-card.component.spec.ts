import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreatedCardComponent } from './forum-created-card.component';

describe('ForumCreatedCardComponent', () => {
  let component: ForumCreatedCardComponent;
  let fixture: ComponentFixture<ForumCreatedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCreatedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCreatedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
