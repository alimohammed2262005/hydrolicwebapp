import { TestBed } from '@angular/core/testing';
import { Servicestatus } from './servicestatus';
describe('Servicestatus', () => {
  let service: Servicestatus;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicestatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});