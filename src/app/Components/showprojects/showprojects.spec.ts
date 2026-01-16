import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showprojects } from './showprojects';

describe('Showprojects', () => {
  let component: Showprojects;
  let fixture: ComponentFixture<Showprojects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showprojects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showprojects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
