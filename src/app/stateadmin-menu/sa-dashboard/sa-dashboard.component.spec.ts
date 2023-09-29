import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SADashboardComponent } from './sa-dashboard.component';

describe('SADashboardComponent', () => {
  let component: SADashboardComponent;
  let fixture: ComponentFixture<SADashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SADashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SADashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
