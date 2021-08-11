import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumDescriptionComponent } from './forum-description.component';

describe('ForumDescriptionComponent', () => {
  let component: ForumDescriptionComponent;
  let fixture: ComponentFixture<ForumDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
