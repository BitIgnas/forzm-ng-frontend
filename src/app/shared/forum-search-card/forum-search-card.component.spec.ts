import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSearchCardComponent } from './forum-search-card.component';

describe('ForumSearchCardComponent', () => {
  let component: ForumSearchCardComponent;
  let fixture: ComponentFixture<ForumSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSearchCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
