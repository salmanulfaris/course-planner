export default interface Course {
    name: string;
    course_id: string;
    credit: number;
    level: string;
    level_id: number;
    prerequisites: Array<string>;
    corequisites: Array<string>;
    // number from 1 to 5
    difficulty: number;
    course_type: 'theory' | 'project';
}
