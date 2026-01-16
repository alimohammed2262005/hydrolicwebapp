import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getdeletedprojectsimages } from './getdeletedprojectsimages';

describe('Getdeletedprojectsimages', () => {
  let component: Getdeletedprojectsimages;
  let fixture: ComponentFixture<Getdeletedprojectsimages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getdeletedprojectsimages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getdeletedprojectsimages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
