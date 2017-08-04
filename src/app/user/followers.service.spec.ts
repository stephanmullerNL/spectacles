import { TestBed, inject } from '@angular/core/testing';

import { FollowersService } from './followers.service';

describe('FollowersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FollowersService]
    });
  });

  it('should be created', inject([FollowersService], (service: FollowersService) => {
    expect(service).toBeTruthy();
  }));
});
