import { Section } from './section'

export class StudentClass {
    name: string;
    priority: number;
    sections: Section[];
    constructor( sections:any){
        this.name = ""
        this.priority = 1
        this.sections=[]
        this.sections.push(sections)
    }
}
