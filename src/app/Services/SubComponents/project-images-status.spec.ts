import { TestBed } from '@angular/core/testing';

import { ProjectImagesStatus } from './project-images-status';

describe('ProjectImagesStatus', () => {
  let service: ProjectImagesStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectImagesStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
