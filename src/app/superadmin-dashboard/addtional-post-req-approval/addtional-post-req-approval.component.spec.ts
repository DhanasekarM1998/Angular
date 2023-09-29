import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtionalPostReqApprovalComponent } from './addtional-post-req-approval.component';

describe('AddtionalPostReqApprovalComponent', () => {
  let component: AddtionalPostReqApprovalComponent;
  let fixture: ComponentFixture<AddtionalPostReqApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtionalPostReqApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtionalPostReqApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
