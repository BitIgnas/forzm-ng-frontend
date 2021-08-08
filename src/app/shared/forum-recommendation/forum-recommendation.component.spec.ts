import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumRecommendationComponent } from './forum-recommendation.component';

describe('ForumRecommendationComponent', () => {
  let component: ForumRecommendationComponent;
  let fixture: ComponentFixture<ForumRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
