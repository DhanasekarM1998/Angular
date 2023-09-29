import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentMeetingsNotifyComponent } from './sent-meetings-notify.component';

describe('SentMeetingsNotifyComponent', () => {
  let component: SentMeetingsNotifyComponent;
  let fixture: ComponentFixture<SentMeetingsNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentMeetingsNotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentMeetingsNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
