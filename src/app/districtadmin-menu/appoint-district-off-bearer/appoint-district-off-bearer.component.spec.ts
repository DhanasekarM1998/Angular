import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointDistrictOffBearerComponent } from './appoint-district-off-bearer.component';

describe('AppointDistrictOffBearerComponent', () => {
  let component: AppointDistrictOffBearerComponent;
  let fixture: ComponentFixture<AppointDistrictOffBearerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointDistrictOffBearerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointDistrictOffBearerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
