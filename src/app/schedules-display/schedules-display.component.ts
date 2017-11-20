import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModule } from 'primeng/primeng';

@Component({
  selector: 'app-schedules-display',
  templateUrl: './schedules-display.component.html',
  styleUrls: ['./schedules-display.component.css']
})
export class SchedulesDisplayComponent {
  @Input() events: any = []
  calendarOptions: Object = {
    height: 650,
    fixedWeekCount: false,
    defaultDate: '2016-09-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    defaultView: 'agendaWeek',
    minTime: "07:00:00",
    maxTime: "23:00:00",
    events: this.events
  };
  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }
}
