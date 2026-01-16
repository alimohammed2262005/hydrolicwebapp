import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addprojectimage } from './addprojectimage';

describe('Addprojectimage', () => {
  let component: Addprojectimage;
  let fixture: ComponentFixture<Addprojectimage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addprojectimage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addprojectimage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
