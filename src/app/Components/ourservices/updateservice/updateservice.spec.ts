import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateservice } from './updateservice';

describe('Updateservice', () => {
  let component: Updateservice;
  let fixture: ComponentFixture<Updateservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateservice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateservice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
