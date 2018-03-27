import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { CalendarComponent } from 'ap-angular2-fullcalendar'
import * as $ from 'jquery';
import 'fullcalendar';
import {Options} from "fullcalendar";

@Component({
  selector: 'app-schedules-display',
  // templateUrl: './schedules-display.component.html',
  styleUrls: ['./schedules-display.component.css'],
  template: '<div></div>',
})
export class SchedulesDisplayComponent implements AfterViewInit {
  @Input() options: Options;
  @Output() initialized: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private element:ElementRef) {
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      // console.log("100ms after ngAfterViewInit ");
      $(this.element.nativeElement).fullCalendar(this.options);
      this.initialized.emit(true);
    }, 100)
  }

  fullCalendar(...args: any[]): any {
    if (!args) {
      return;
    }
    switch (args.length) {
      case 0:
        return;
      case 1:
        return $(this.element.nativeElement).fullCalendar(args[0]);
      case 2:
        return $(this.element.nativeElement).fullCalendar(args[0], args[1]);
      case 3:
        return $(this.element.nativeElement).fullCalendar(args[0], args[1], args[2]);
    }
  }
}
