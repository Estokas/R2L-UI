import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewService } from './review-service';

describe('ReviewService', () => {
  let component: ReviewService;
  let fixture: ComponentFixture<ReviewService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
