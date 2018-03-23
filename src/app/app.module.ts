import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { SchedulesDisplayComponent } from './schedules-display/schedules-display.component';
import { PrintSchedulesComponent } from './print-schedules/print-schedules.component';
import { ScheduleService } from './schedule.service';
// import { CalendarComponent } from "ap-angular2-fullcalendar";

@NgModule({
  declarations: [
    AppComponent,
    ClassFormComponent,
    SchedulesDisplayComponent,
    PrintSchedulesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
