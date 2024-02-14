import { TestBed } from '@angular/core/testing';

import { SocialmediaserviceService } from './socialmediaservice.service';

describe('SocialmediaserviceService', () => {
  let service: SocialmediaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialmediaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
