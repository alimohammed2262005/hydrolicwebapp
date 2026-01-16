import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsImages } from './projects-images';

describe('ProjectsImages', () => {
  let component: ProjectsImages;
  let fixture: ComponentFixture<ProjectsImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
