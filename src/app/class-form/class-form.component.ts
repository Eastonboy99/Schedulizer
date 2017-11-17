import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
      ])
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

  addTime(class_number: number, section_number: number){
    const control = <FormArray>this.classes.controls[class_number]['controls'].sections['controls'][section_number]['controls'].times
    control.push(this.initTime())
  }


  generateSchedules(){
    const classes = this.classes.value
    console.log(this.classes)
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
