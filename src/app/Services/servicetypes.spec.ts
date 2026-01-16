import { TestBed } from '@angular/core/testing';

import { Servicetypes } from './servicetypes';

describe('Servicetypes', () => {
  let service: Servicetypes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicetypes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
