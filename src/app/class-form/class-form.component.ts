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
  classesArray: FormArray
  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.classesArray = new FormArray([])
    this.classesArray.push(this.fb.group(new StudentClass(this.fb.group(new Section()))))
    this.classForm = this.fb.group({
      classes: this.classesArray
    })

  }
  // setClasses(classes: StudentClass[]) {
  //   const classFGs = []
  //   classFGs.push(new StudentClass())
  //   const classFormArray = this.fb.array(classFGs);
  //   this.classForm.setControl('classes', classFormArray);
  // }
  get classes(): FormArray {
    return this.classForm.get('classes') as FormArray;
  };
  ngOnInit() {
    // this.classes.push(this.fb.group(new StudentClass()))

    console.log(this.classes)
  }

}
