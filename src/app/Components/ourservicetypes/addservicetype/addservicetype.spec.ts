import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddServicetype } from './addservicetype';

describe('AddServicetype', () => {
  let component: AddServicetype;
  let fixture: ComponentFixture<AddServicetype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServicetype]
    }).compileComponents();

    fixture = TestBed.createComponent(AddServicetype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
