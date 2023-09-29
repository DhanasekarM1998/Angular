import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllDistrictComponent } from './report-all-district.component';

describe('ReportAllDistrictComponent', () => {
  let component: ReportAllDistrictComponent;
  let fixture: ComponentFixture<ReportAllDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAllDistrictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAllDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
