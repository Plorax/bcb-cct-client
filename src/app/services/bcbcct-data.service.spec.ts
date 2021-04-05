import { TestBed } from '@angular/core/testing';

import { BcbcctDataService } from './bcbcct-data.service';

describe('BcbcctDataService', () => {
  let service: BcbcctDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BcbcctDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
