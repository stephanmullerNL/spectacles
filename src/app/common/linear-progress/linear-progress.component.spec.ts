import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearProgressComponent } from './linear-progress.component';

describe('LinearProgressComponent', () => {
  let component: LinearProgressComponent;
  let fixture: ComponentFixture<LinearProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
