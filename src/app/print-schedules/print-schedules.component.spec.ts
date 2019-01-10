import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSchedulesComponent } from './print-schedules.component';

describe('PrintSchedulesComponent', () => {
  let component: PrintSchedulesComponent;
  let fixture: ComponentFixture<PrintSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
