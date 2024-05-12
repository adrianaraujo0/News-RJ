import { TestBed } from '@angular/core/testing';

import { RjService } from './rj.service';

describe('RjService', () => {
  let service: RjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
