import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOrRejComponent } from './app-or-rej.component';

describe('AppOrRejComponent', () => {
  let component: AppOrRejComponent;
  let fixture: ComponentFixture<AppOrRejComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppOrRejComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppOrRejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
