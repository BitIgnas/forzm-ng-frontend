import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumDeleteComponent } from './forum-delete.component';

describe('ForumDeleteComponent', () => {
  let component: ForumDeleteComponent;
  let fixture: ComponentFixture<ForumDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
