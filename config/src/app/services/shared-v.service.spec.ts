import { TestBed } from '@angular/core/testing';

import { SharedVService } from './shared-v.service';

describe('SharedVService', () => {
  let service: SharedVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
