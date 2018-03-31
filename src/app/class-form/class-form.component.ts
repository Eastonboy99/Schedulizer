import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as Sugar from 'sugar';
import { ScheduleService } from '../schedule.service';


@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements AfterViewInit {
  classForm: FormGroup; // the form group to hold the data
  eventsSchedules: any; // generated schedules
  constructor(private fb: FormBuilder, private schedules: ScheduleService) {
    this.createForm();
    this.getPreviousClasses();
    // this.debug()
  }
  // Creates Form to store data in
  createForm() {
    this.classForm = this.fb.group({
      classes: this.fb.array([
        this.initClass()
      ]),
      classes_per_schedule: 0
    })
  }
  // gets classes previously entered from cookies
  getPreviousClasses() {
    let local_classes = localStorage.getItem("classes"); // classes from cookie to be parsed by json
    let classes = JSON.parse(local_classes);// parsed classes from cookie

    if (classes) {
      let class_counter = 0; // tracker for the current class
      for (let saved_class of classes.classes) {
        if (class_counter != 0)
          this.addClass();
        let section_counter = 0; // tracker for current section
        for (let section of saved_class.sections) {
          if (section_counter != 0)
            this.addSection(class_counter);
          let time_counter = 0; // tracker for current time
          for (let time of section.times) {
            if (time_counter != 0)
              this.addTime(class_counter, section_counter)
            time_counter++;
          }
          section_counter++;
        }
        class_counter++;
      }
      this.classForm.setValue(classes);
    }

  }
  // creates the class form controller
  initClass() {
    return this.fb.group({
      name: ['', Validators.required],
      priority: ['', Validators.required],
      sections: this.fb.array([
        this.initSection()
      ])
    })
  }
  // creates the section form controller
  initSection() {
    return this.fb.group({
      name: ['', Validators.required],
      times: this.fb.array([
        this.initTime()
      ])
    })
  }
  // creates the time form controller
  initTime() {
    return this.fb.group({
      day: ['Sunday', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    })
  }
  // returns classes from form
  get classes(): FormArray {
    return this.classForm.get('classes') as FormArray;
  };
  // addeds a class to the form on view
  addClass() {
    const control = <FormArray>this.classes
    control.push(this.initClass())
  }
  // adds a section to the form on the view
  addSection(class_number: number) {
    const control = <FormArray>this.classes.controls[class_number]['controls'].sections
    control.push(this.initSection())
  }
  // adds a time to the form on the view
  addTime(class_number: number, section_number: number) {
    const control = <FormArray>this.classes.controls[class_number]['controls'].sections['controls'][section_number]['controls'].times
    control.push(this.initTime())
  }
  // used to debug by providing test data
  debug() {
    this.addClass()
    this.addSection(0)
    this.addTime(0, 0)
    this.addTime(0, 0)
    this.addTime(0, 1)

    this.addSection(1)

    this.classForm.setValue({ "classes": [{ "name": "CS108", "priority": 1, "sections": [{ "name": "Morning", "times": [{ "day": "Monday", "start_time": "10:40", "end_time": "11:50" }, { "day": "Wednesday", "start_time": "10:40", "end_time": "11:50" }, { "day": "Friday", "start_time": "10:40", "end_time": "11:50" }] }, { "name": "Afternoon", "times": [{ "day": "Tuesday", "start_time": "14:00", "end_time": "16:00" }, { "day": "Thursday", "start_time": "14:00", "end_time": "16:00" }] }] }, { "name": "HIS108", "priority": 2, "sections": [{ "name": "Conflicts", "times": [{ "day": "Monday", "start_time": "11:00", "end_time": "12:00" }] }, { "name": "No Conflicts", "times": [{ "day": "Monday", "start_time": "14:02", "end_time": "15:00" }] }] }], "classes_per_schedule": "1" })

  }
  // uses schedules service to generate all possible schedules
  generateSchedules() {
    this.clearSchedules();
    const classes = this.classes.value
    localStorage.setItem("classes", JSON.stringify(this.classForm.value));
    this.schedules.generateSchedules(classes, this.classForm.value.classes_per_schedule);
    this.eventsSchedules = this.schedules.getSchedules();

  }
  // removes class from Form
  removeClass(class_id: number) {
    const control = <FormArray>this.classes
    control.removeAt(class_id)
  }
  // removes section from class
  removeSection(class_id: number, section_id: number) {
    const control = <FormArray>this.classes.controls[class_id]['controls'].sections
    control.removeAt(section_id)
  }
  // removes time from section
  removeTime(class_id: number, section_id: number, time_id: number) {
    const control = <FormArray>this.classes.controls[class_id]['controls'].sections['controls'][section_id]['controls'].times
    control.removeAt(time_id)
  }
  // clears generated schedules
  clearSchedules() {
    this.eventsSchedules = []
    this.schedules.clearSchedules()

  }
  clearClasses() {
    // this.classForm.setValue(null);
    localStorage.setItem("classes", null);
    this.createForm();
  }
  ngAfterViewInit() {
    this.classForm.valueChanges.subscribe(classes => {
      localStorage.setItem("classes", JSON.stringify(classes));
    })
  }

}
