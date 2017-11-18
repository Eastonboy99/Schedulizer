import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {ScheduleModule} from 'primeng/primeng';

import { Section } from '../section'
import { Time } from '../time'
import { StudentClass } from '../student-class';

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
  constructor(private fb: FormBuilder) {
    this.createForm()
    this.debug()
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
    const classes = this.classes.value
    let sections = []
    let schedules = []
    let class_counter = 0

    // Create all possible sections
    for (let student_class of classes) {
      for (let section of student_class.sections) {
        sections.push({
          id: class_counter,
          class_name: student_class.name,
          section_name: section.name,
          times: section.times.slice()
        })
        class_counter++
      }

    }

    // Create all possible Schedule Combinations
    for (let i = 0; i < Number(this.classForm.value.classes_per_schedule) + 1; i++) {
      let new_schedule = []
      if (i == 0) {
        for (let section of sections) {
          new_schedule.push([section])
        }
      } else {
        for (let schedule of schedules[i - 1]) {
          for (let scheduled_section of schedule) {
            for (let section of sections) {
              // if they are the same class, skip
              if (section.class_name.toLowerCase() == scheduled_section.class_name.toLowerCase()) {
                continue;
              }

              let conflicts = false
              let temp_schedule = schedule.slice()
              // Check to make sure times dont conflict
              for (let scheduled_section_time of scheduled_section.times) {
                for (let section_time of section.times) {
                  if (scheduled_section_time.day == section_time.day) {
                    if (scheduled_section_time.start_time <= section_time.start_time && section_time.start_time <= scheduled_section_time.end_time || scheduled_section_time.start_time <= section_time.end_time && section_time.end_time <= scheduled_section_time.end_time) {
                      conflicts = true;
                      break;
                    }
                  }
                }
                if (conflicts) break;
              }
              if (conflicts)
                continue;

              temp_schedule.push(section)

              // Remove duplicate Schedules
              let sorted_schedule = temp_schedule.sort((obj1, obj2) => {
                if (obj1.id > obj2.id) {
                  return 1;
                }

                if (obj1.id < obj2.id) {
                  return -1;
                }

                return 0;
              })
              let push = true
              let sorted_keys = []
              for (let sorted_schedule_class of sorted_schedule) {
                sorted_keys.push(sorted_schedule_class.id)
              }
              for (let check_schedule of new_schedule) {
                let key = []
                for (let classes of check_schedule) {
                  key.push(classes.id)
                }


                if (this.arraysEqual(key, sorted_keys)) {
                  push = false;
                  break;
                }
              }
              if (push) {
                new_schedule.push(sorted_schedule)
              }

            }
          }
        }

      }
      schedules.push(new_schedule)
    }
    console.log(schedules)
  }

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
        return false;
    }

    return true;
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
