import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { SchedulesDisplayComponent } from './schedules-display/schedules-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassFormComponent,
    SchedulesDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
