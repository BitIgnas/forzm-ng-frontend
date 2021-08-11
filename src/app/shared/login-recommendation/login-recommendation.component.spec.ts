import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecommendationComponent } from './login-recommendation.component';

describe('LoginRecommendationComponent', () => {
  let component: LoginRecommendationComponent;
  let fixture: ComponentFixture<LoginRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
