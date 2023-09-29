import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateadminComponent } from './stateadmin.component';

describe('StateadminComponent', () => {
  let component: StateadminComponent;
  let fixture: ComponentFixture<StateadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
