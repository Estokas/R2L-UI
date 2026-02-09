import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsCard } from './findings-card';

describe('FindingsCard', () => {
  let component: FindingsCard;
  let fixture: ComponentFixture<FindingsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindingsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
