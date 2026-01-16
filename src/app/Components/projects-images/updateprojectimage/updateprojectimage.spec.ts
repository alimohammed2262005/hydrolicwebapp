import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateprojectimage } from './updateprojectimage';

describe('Updateprojectimage', () => {
  let component: Updateprojectimage;
  let fixture: ComponentFixture<Updateprojectimage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateprojectimage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateprojectimage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
