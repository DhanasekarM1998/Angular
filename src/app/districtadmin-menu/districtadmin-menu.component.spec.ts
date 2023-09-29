import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictadminMenuComponent } from './districtadmin-menu.component';

describe('DistrictadminMenuComponent', () => {
  let component: DistrictadminMenuComponent;
  let fixture: ComponentFixture<DistrictadminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictadminMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictadminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
