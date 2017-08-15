import { TestBed, inject } from '@angular/core/testing';

import { SteemService } from './steem.service';

describe('SteemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SteemService]
    });
  });

  it('should be created', inject([SteemService], (service: SteemService) => {
    expect(service).toBeTruthy();
  }));
});
