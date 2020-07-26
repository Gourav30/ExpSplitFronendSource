import { TestBed } from '@angular/core/testing';

import { UserRouteguardService } from './user-routeguard.service';

describe('UserRouteguardService', () => {
  let service: UserRouteguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRouteguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
