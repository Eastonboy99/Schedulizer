import { Time } from './time'


export class Section{
    name: string;
    times: Time[];

    constructor(initTimes:any){
        this.name = "test"
        this.times = []
        this.times.push(initTimes)
    }
}
