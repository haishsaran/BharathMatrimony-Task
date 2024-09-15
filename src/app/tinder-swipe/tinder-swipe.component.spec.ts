import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderSwipeComponent } from './tinder-swipe.component';

describe('TinderSwipeComponent', () => {
  let component: TinderSwipeComponent;
  let fixture: ComponentFixture<TinderSwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinderSwipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinderSwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
