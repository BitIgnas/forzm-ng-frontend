import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostImageComponent } from './create-post-image.component';

describe('CreatePostImageComponent', () => {
  let component: CreatePostImageComponent;
  let fixture: ComponentFixture<CreatePostImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
