import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeBearerApprovalComponent } from './office-bearer-approval.component';

describe('OfficeBearerApprovalComponent', () => {
  let component: OfficeBearerApprovalComponent;
  let fixture: ComponentFixture<OfficeBearerApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeBearerApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeBearerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
