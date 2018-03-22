import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-print-schedules',
  templateUrl: './print-schedules.component.html',
  styleUrls: ['./print-schedules.component.css']
})
export class PrintSchedulesComponent implements OnInit {

  constructor(private route: ActivatedRoute) {   }

  ngOnInit() {
    
    const id = +this.route.snapshot.paramMap.get('id');
  }

}
