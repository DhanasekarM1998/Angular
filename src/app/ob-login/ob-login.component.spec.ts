import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObLoginComponent } from './ob-login.component';

describe('ObLoginComponent', () => {
  let component: ObLoginComponent;
  let fixture: ComponentFixture<ObLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
