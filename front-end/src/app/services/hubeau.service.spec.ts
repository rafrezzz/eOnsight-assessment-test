import { TestBed } from '@angular/core/testing';

import { HubeauService } from './hubeau.service';

describe('HubeauService', () => {
  let service: HubeauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubeauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
