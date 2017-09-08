import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLinkComponent } from './post-link.component';

describe('PostLinkComponent', () => {
  let component: PostLinkComponent;
  let fixture: ComponentFixture<PostLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
