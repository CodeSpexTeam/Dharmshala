import { TestBed } from '@angular/core/testing';

import { GalleryserviceService } from './galleryservice.service';

describe('GalleryserviceService', () => {
  let service: GalleryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
