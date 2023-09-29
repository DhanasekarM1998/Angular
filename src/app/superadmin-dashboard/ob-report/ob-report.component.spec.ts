import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObReportComponent } from './ob-report.component';

describe('ObReportComponent', () => {
  let component: ObReportComponent;
  let fixture: ComponentFixture<ObReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
