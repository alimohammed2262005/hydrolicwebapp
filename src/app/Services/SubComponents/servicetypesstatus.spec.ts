import { TestBed } from '@angular/core/testing';
import { ServiceTypesstatus } from './servicetypesstatus';
describe('ServiceTypesStatus', () => {
  let service: ServiceTypesstatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTypesstatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});