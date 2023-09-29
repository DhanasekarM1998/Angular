import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqOffBearerChangeComponent } from './req-off-bearer-change.component';

describe('ReqOffBearerChangeComponent', () => {
  let component: ReqOffBearerChangeComponent;
  let fixture: ComponentFixture<ReqOffBearerChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqOffBearerChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqOffBearerChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
