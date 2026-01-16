import { TestBed } from '@angular/core/testing';
import { Projectstatus } from './projectstatus';
describe('Projectstatus', () => {
  let service: Projectstatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Projectstatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});