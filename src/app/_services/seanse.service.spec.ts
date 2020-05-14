import { TestBed } from '@angular/core/testing';

import { SeanseService } from './seanse.service';

describe('SeanseService', () => {
  let service: SeanseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeanseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
