import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictadminComponent } from './districtadmin.component';

describe('DistrictadminComponent', () => {
  let component: DistrictadminComponent;
  let fixture: ComponentFixture<DistrictadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
