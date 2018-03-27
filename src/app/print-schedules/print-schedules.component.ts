import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../schedule.service';
@Component({
  selector: 'app-print-schedules',
  templateUrl: './print-schedules.component.html',
  styleUrls: ['./print-schedules.component.css']
})
export class PrintSchedulesComponent implements AfterViewInit {
  private schedule;
  private id: Number;

  constructor(private route: ActivatedRoute, private schedules: ScheduleService) {
    this.getSchedule();
  }

  ngAfterViewInit() {

    // this.print();

  }
  // gets specified schedule for print
  getSchedule() {
    this.id = +this.route.snapshot.paramMap.get('id');
    // console.log(this.id)
    this.schedule = this.schedules.getSchedule(this.id);
    // console.log(this.schedule)
  }
  // opens print window
  print() {
    window.print();
    window.close();
  }


}
