import { Time } from './time'


export class Section{
    name: string;
    times: Time[] = [];

    constructor(){
        this.name = ""
        this.times = []
        this.times.push(new Time())
    }
}
