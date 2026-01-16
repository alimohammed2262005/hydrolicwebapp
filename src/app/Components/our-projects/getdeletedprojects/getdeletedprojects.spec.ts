import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getdeletedprojects } from './getdeletedprojects';

describe('Getdeletedprojects', () => {
  let component: Getdeletedprojects;
  let fixture: ComponentFixture<Getdeletedprojects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getdeletedprojects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getdeletedprojects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
