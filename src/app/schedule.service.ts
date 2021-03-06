import { Injectable } from '@angular/core';
import * as Sugar from 'sugar';
@Injectable()
export class ScheduleService {
  private eventsSchedules: any // generated schedules
  constructor() {
    this.eventsSchedules = localStorage.getItem("schedules")
    if (this.eventsSchedules) {
      this.eventsSchedules = JSON.parse(this.eventsSchedules)
    }
  }
  // returns generated schedules
  getSchedules() {
    return this.eventsSchedules
  }
  // returns specific schedule 
  getSchedule(id) {
    console.log(this.eventsSchedules)
    return this.eventsSchedules[id]
  }
  // generates all possible schedules
  generateSchedules(classes, classes_per_schedule) {
    let sections = [] // list of sections to use in the schedules
    let schedules = [] // already generated schedules
    let class_counter = 0; // counter for current class
    let section_counter = 0; // counter for current section

    // Create all possible sections
    for (let student_class of classes) {
      for (let section of student_class.sections) {
        let times = []
        for (let time of section.times) {
          times.push({
            start_time: Sugar.Date.create(time.day + ' ' + time.start_time),
            end_time: Sugar.Date.create(time.day + ' ' + time.end_time)
          })
        }
        sections.push({
          id: section_counter,
          class_id: class_counter,
          class_name: student_class.name,
          section_name: section.name,
          times: times
        })
        section_counter++
      }
      class_counter++
    }

    // Create all possible Schedule Combinations
    for (let i = 0; i < Number(classes_per_schedule) + 1; i++) {
      let new_schedule = []
      if (i == 0) {
        for (let section of sections) {
          new_schedule.push([section])
        }
      } else {
        // schedule = current schedule to check
        for (let schedule of schedules[i - 1]) {
          let same = false;
          // section = current section to compair to schedule to see if it fits
          for (let section of sections) {
            let conflicts = false
            let temp_schedule = schedule.slice() // the current schedule to add to if possible
            // schedule_section = current section in the current schedule to compair to the current section
            for (let scheduled_section of schedule) {
              // if they are the same class, skip
              if (section.class_id == scheduled_section.class_id) {
                same = true;
                break;
              }
              // Check to make sure times dont conflict
              for (let section_time of section.times) {
                for (let scheduled_section_time of scheduled_section.times) {
                  if (scheduled_section_time.day == section_time.day) {
                    if (section_time.start_time >= scheduled_section_time.start_time && section_time.start_time <= scheduled_section_time.end_time ||
                      section_time.end_time >= scheduled_section_time.start_time && section_time.end_time <= scheduled_section_time.end_time) {
                      conflicts = true;
                      break;
                    }
                  }
                }
                if (conflicts) break;
              }
              if (conflicts) break;
            }
            if (!conflicts && !same) {
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
            if (same) break;
          }
        }

      }
      schedules.push(new_schedule)
    }
    this.eventsSchedules = []
    let counter = 0;
    for (let schedule of schedules[schedules.length - 1]) {
      this.eventsSchedules.push({
        height: 'auto',
        fixedWeekCount: false,
        eventLimit: true, // allow "more" link when too many events
        defaultView: 'agendaWeek',
        minTime: "07:00:00",
        maxTime: "23:00:00",
        // customButtons: {
        //   print: {
        //     text: 'print',
        //     click: window.location.href='/print/'+counter
        //   }
        // },
        header: {
          left: '',
          center: '',
          right: ''
        },
        // titleFormat: '[Schedule ' + (counter + 1) + ']',
        events: []
      })
      for (let college_class of schedule) {
        for (let time of college_class.times) {
          this.eventsSchedules[counter].events.push({
            title: college_class.class_name + " - " + college_class.section_name,
            start: time.start_time,
            end: time.end_time,
            timezone: 'America/New_York'
          })
        }
      }
      counter++;
    }
    localStorage.setItem("schedules", JSON.stringify(this.eventsSchedules));
  }
  // clear schedules from local storage 
  clearSchedules(){
  localStorage.setItem("schedules", null);
  }
  // check to see if arrays are the same to remove duplicate schedules
  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }
}
