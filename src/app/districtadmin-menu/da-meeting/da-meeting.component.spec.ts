import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaMeetingComponent } from './da-meeting.component';

describe('DaMeetingComponent', () => {
  let component: DaMeetingComponent;
  let fixture: ComponentFixture<DaMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
