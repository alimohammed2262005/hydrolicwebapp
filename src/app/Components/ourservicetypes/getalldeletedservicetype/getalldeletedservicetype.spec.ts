import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getalldeletedservicetype } from './getalldeletedservicetype';

describe('Getalldeletedservicetype', () => {
  let component: Getalldeletedservicetype;
  let fixture: ComponentFixture<Getalldeletedservicetype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getalldeletedservicetype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getalldeletedservicetype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
