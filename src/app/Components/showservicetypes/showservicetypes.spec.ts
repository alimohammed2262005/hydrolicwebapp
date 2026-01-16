import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showservicetypes } from './showservicetypes';

describe('Showservicetypes', () => {
  let component: Showservicetypes;
  let fixture: ComponentFixture<Showservicetypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showservicetypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showservicetypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
