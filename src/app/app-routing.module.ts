import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassFormComponent } from './class-form/class-form.component';     
import { PrintSchedulesComponent } from './print-schedules/print-schedules.component';  
import { SchedulesDisplayComponent } from './schedules-display/schedules-display.component'

//This is my case 
const routes: Routes = [
    {
        path: '',
        component: ClassFormComponent
    },
    {
        path: 'print/:id',
        component: PrintSchedulesComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }