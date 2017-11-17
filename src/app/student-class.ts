import { Section } from './section'

export class StudentClass {
    name: string;
    priority: number;
    sections: Section[];
    constructor( initSections:any){
        this.name = ""
        this.priority = 1
        this.sections=[]
        this.sections.push(initSections)
    }
}
