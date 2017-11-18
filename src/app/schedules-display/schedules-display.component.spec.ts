import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesDisplayComponent } from './schedules-display.component';

describe('SchedulesDisplayComponent', () => {
  let component: SchedulesDisplayComponent;
  let fixture: ComponentFixture<SchedulesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
