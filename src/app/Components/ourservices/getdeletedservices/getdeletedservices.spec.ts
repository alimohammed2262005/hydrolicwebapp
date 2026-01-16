import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getdeletedservices } from './getdeletedservices';

describe('Getdeletedservices', () => {
  let component: Getdeletedservices;
  let fixture: ComponentFixture<Getdeletedservices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getdeletedservices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getdeletedservices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
