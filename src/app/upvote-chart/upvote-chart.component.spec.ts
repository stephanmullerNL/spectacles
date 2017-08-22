import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpvoteChartComponent } from './upvote-chart.component';

describe('UpvoteChartComponent', () => {
  let component: UpvoteChartComponent;
  let fixture: ComponentFixture<UpvoteChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpvoteChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpvoteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
