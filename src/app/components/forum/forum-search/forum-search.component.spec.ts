import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSearchComponent } from './forum-search.component';

describe('ForumSearchComponent', () => {
  let component: ForumSearchComponent;
  let fixture: ComponentFixture<ForumSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
