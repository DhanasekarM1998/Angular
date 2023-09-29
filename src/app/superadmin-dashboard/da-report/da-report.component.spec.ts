import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaReportComponent } from './da-report.component';

describe('DaReportComponent', () => {
  let component: DaReportComponent;
  let fixture: ComponentFixture<DaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
