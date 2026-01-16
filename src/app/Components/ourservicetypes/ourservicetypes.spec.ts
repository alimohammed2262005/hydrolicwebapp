import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ourservicetypes } from './ourservicetypes';

describe('Ourservicetypes', () => {
  let component: Ourservicetypes;
  let fixture: ComponentFixture<Ourservicetypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ourservicetypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ourservicetypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
