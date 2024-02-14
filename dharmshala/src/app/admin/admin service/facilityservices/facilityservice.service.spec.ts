import { TestBed } from '@angular/core/testing';

import { FacilityserviceService } from './facilityservice.service';

describe('FacilityserviceService', () => {
  let service: FacilityserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilityserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
