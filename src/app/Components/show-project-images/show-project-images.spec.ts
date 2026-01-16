import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectImages } from './show-project-images';

describe('ShowProjectImages', () => {
  let component: ShowProjectImages;
  let fixture: ComponentFixture<ShowProjectImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProjectImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProjectImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
