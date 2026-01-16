import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectImages } from './admin-project-images';

describe('AdminProjectImages', () => {
  let component: AdminProjectImages;
  let fixture: ComponentFixture<AdminProjectImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjectImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
