import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOffBearerComponent } from './create-off-bearer.component';

describe('CreateOffBearerComponent', () => {
  let component: CreateOffBearerComponent;
  let fixture: ComponentFixture<CreateOffBearerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOffBearerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOffBearerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
