import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateadminMenuComponent } from './stateadmin-menu.component';

describe('StateadminMenuComponent', () => {
  let component: StateadminMenuComponent;
  let fixture: ComponentFixture<StateadminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateadminMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateadminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
