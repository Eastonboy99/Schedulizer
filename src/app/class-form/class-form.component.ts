import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as Sugar from 'sugar';
import { ScheduleService } from '../schedule.service';


@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {
  classForm: FormGroup;
  classesArray: FormArray;
  sectionArray: FormArray;
  timeArray: FormArray;
  eventsSchedules: any;
  constructor(private fb: FormBuilder, private schedules: ScheduleService) {
    this.createForm();
    this.getPreviousClasses();
    // this.debug()
  }

  // createForm() {
  //   this.timeArray = new FormArray([])
  //   this.timeArray.push(this.fb.group(new Time()))
  //   this.sectionArray = new FormArray([])
  //   this.sectionArray.push(this.fb.group(new Section(this.timeArray)))
  //   this.classesArray = new FormArray([])
  //   this.classesArray.push(this.fb.group(new StudentClass(this.sectionArray)))

  //   this.classForm = this.fb.group({
  //     classes: this.classesArray
  //   })

  // }

  createForm() {
    this.classForm = this.fb.group({
      classes: this.fb.array([
        this.initClass()
      ]),
      classes_per_schedule: 0
    })
  }
  getPreviousClasses() {
    let local_classes = localStorage.getItem("classes");
    let classes = JSON.parse(local_classes);
    if (classes) {
      let class_counter = 0;
      for (let saved_class of classes) {
        this.addClass();
        let section_counter = 0;
        for(let section of saved_class.sections){
          this.addSection(class_counter);
          for(let time of section.times){
            this.addTime(class_counter, section_counter)
          }
          section_counter++;
        }
        class_counter++;
      }
    }
    this.classForm.setValue(classes);
  }
  initClass() {
    return this.fb.group({
      name: ['', Validators.required],
      priority: ['', Validators.required],
      sections: this.fb.array([
        this.initSection()
      ])
    })
  }

  initSection() {
    return this.fb.group({
      name: ['', Validators.required],
      times: this.fb.array([
        this.initTime()
      ])
    })
  }

  initTime() {
    return this.fb.group({
      day: ['Sunday', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    })
  }

  get classes(): FormArray {
    return this.classForm.get('classes') as FormArray;
  };

  addClass() {
    const control = <FormArray>this.classes
    control.push(this.initClass())
  }

  addSection(class_number: number) {
    const control = <FormArray>this.classes.controls[class_number]['controls'].sections
    control.push(this.initSection())
  }

  addTime(class_number: number, section_number: number) {
    const control = <FormArray>this.classes.controls[class_number]['controls'].sections['controls'][section_number]['controls'].times
    control.push(this.initTime())
  }

  debug() {
    this.addClass()
    this.addSection(0)
    this.addTime(0, 0)
    this.addTime(0, 0)
    this.addTime(0, 1)

    this.addSection(1)

    this.classForm.setValue({ "classes": [{ "name": "CS108", "priority": 1, "sections": [{ "name": "Morning", "times": [{ "day": "Monday", "start_time": "10:40", "end_time": "11:50" }, { "day": "Wednesday", "start_time": "10:40", "end_time": "11:50" }, { "day": "Friday", "start_time": "10:40", "end_time": "11:50" }] }, { "name": "Afternoon", "times": [{ "day": "Tuesday", "start_time": "14:00", "end_time": "16:00" }, { "day": "Thursday", "start_time": "14:00", "end_time": "16:00" }] }] }, { "name": "HIS108", "priority": 2, "sections": [{ "name": "Conflicts", "times": [{ "day": "Monday", "start_time": "11:00", "end_time": "12:00" }] }, { "name": "No Conflicts", "times": [{ "day": "Monday", "start_time": "14:02", "end_time": "15:00" }] }] }], "classes_per_schedule": "1" })
  }

  generateSchedules() {
    this.clearSchedules();
    const classes = this.classes.value
    localStorage.setItem("classes", JSON.stringify(classes));
    this.schedules.generateSchedules(classes, this.classForm.value.classes_per_schedule);
    this.eventsSchedules = this.schedules.getSchedules();

  }
  clearSchedules() {
    this.eventsSchedules = []

  }



  ngOnInit() {
    // this.classes.push(this.fb.group(new StudentClass()))
    // for (let student_class of this.classes.controls) {
    //   console.log(student_class)
    //   for (let section of student_class.value.sections.controls) {
    //     console.log(section)
    //     for (let time of section.controls.times.controls) {
    //       console.log(time)
    //     }
    //   }
    // }
    // console.log(this.classes)
  }

}
