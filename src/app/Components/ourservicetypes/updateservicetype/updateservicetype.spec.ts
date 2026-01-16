import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateServicetype } from './updateservicetype';

describe('UpdateServicetype', () => {
  let component: UpdateServicetype;
  let fixture: ComponentFixture<UpdateServicetype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateServicetype]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateServicetype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
