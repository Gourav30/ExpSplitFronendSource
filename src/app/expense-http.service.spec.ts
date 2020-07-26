import { TestBed } from '@angular/core/testing';

import { ExpenseHttpService } from './expense-http.service';

describe('ExpenseHttpService', () => {
  let service: ExpenseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
