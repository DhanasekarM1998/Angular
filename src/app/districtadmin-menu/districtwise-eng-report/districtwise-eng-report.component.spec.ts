import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictwiseEngReportComponent } from './districtwise-eng-report.component';

describe('DistrictwiseEngReportComponent', () => {
  let component: DistrictwiseEngReportComponent;
  let fixture: ComponentFixture<DistrictwiseEngReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictwiseEngReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictwiseEngReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
