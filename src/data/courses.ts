import type  Course  from "../interfaces";

let iitCourses: Course[] = [
    { name: 'Mathematics for Data Science I', course_id: 'BSMA1001', credit: 4, level: 'foundation', level_id: 1, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:3.2},
    { name: 'Statistics for Data Science I', course_id: 'BSMA1002', credit: 4, level: 'foundation', level_id: 1, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:3},
    { name: 'Computational Thinking', course_id: 'BSCS1001', credit: 4, level: 'foundation', level_id: 1, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:2.5},
    { name: 'English I', course_id: 'BSHS1001', credit: 4, level: 'foundation', level_id: 1, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:1.5},
    { name: 'Mathematics for Data Science II', course_id: 'BSMA1003', credit: 4, level: 'foundation', level_id: 1, prerequisites: ['BSMA1001'], corequisites: [], course_type: 'theory' ,difficulty:3.6},
    { name: 'Statistics for Data Science II', course_id: 'BSMA1004', credit: 4, level: 'foundation', level_id: 1, prerequisites: ['BSMA1002', 'BSMA1001'], corequisites: ['BSMA1003'], course_type: 'theory' ,difficulty:3.7},
    { name: 'Programming in Python', course_id: 'BSCS1002', credit: 4, level: 'foundation', level_id: 1, prerequisites: ['BSCS1001'], corequisites: [], course_type: 'theory' ,difficulty:3},
    { name: 'English II', course_id: 'BSHS1002', credit: 4, level: 'foundation', level_id: 1, prerequisites: ['BSHS1001'], corequisites: [], course_type: 'theory' ,difficulty:2},
    { name: 'Database Management Systems', course_id: 'BSCS2001', credit: 4, level: 'diploma', level_id: 2, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:3.30},
    { name: 'Programming, Data Structures and Algorithms using Python', course_id: 'BSCS2002', credit: 4, level: 'diploma', level_id: 2, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:4.40},
    { name: 'Modern Application Development I', course_id: 'BSCS2003', credit: 4, level: 'diploma', level_id: 2, prerequisites: [], corequisites: ['BSCS2001'], course_type: 'theory' ,difficulty:3.20},
    { name: 'PROJECT Modern Application Development I - Project', course_id: 'BSCS2003P', credit: 2, level: 'diploma', level_id: 2, prerequisites: [], corequisites: ['BSCS2003'], course_type: 'project' ,difficulty:3.63},
    { name: 'Programming Concepts using Java', course_id: 'BSCS2005', credit: 4, level: 'diploma', level_id: 2, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:3.49},
    { name: 'Modern Application Development II', course_id: 'BSCS2006', credit: 4, level: 'diploma', level_id: 2, prerequisites: ['BSCS2003'], corequisites: [], course_type: 'theory' ,difficulty:3.96},
    { name: 'PROJECT Modern Application Development II - Project', course_id: 'BSCS2006P', credit: 2, level: 'diploma', level_id: 2, prerequisites: ['BSCS2003P'], corequisites: ['BSCS2006'], course_type: 'project' ,difficulty:4.18},
    { name: 'System Commands', course_id: 'BSSE2001', credit: 3, level: 'diploma', level_id: 2, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:3.57},
    { name: 'Machine Learning Foundations', course_id: 'BSCS2004', credit: 4, level: 'diploma', level_id: 2, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:3.32},
    { name: 'Business Data Management', course_id: 'BSMS2001', credit: 4, level: 'diploma', level_id: 2, prerequisites: [], corequisites: [], course_type: 'theory' ,difficulty:2.20},
    { name: 'PROJECT Business Data Management - Project', course_id: 'BSMS2001P', credit: 2, level: 'diploma', level_id: 2, prerequisites: [], corequisites: ['BSMS2001'], course_type: 'project' ,difficulty:3.53},
    { name: 'Machine Learning Techniques', course_id: 'BSCS2007', credit: 4, level: 'diploma', level_id: 2, prerequisites: [], corequisites: ['BSCS2004'], course_type: 'theory' ,difficulty:4.21},
    { name: 'Machine Learning Practice', course_id: 'BSCS2008', credit: 4, level: 'diploma', level_id: 2, prerequisites: ['BSCS2004', 'BSCS2007'], corequisites: [], course_type: 'theory' ,difficulty:3.70},
    { name: 'PROJECT Machine Learning Practice - Project', course_id: 'BSCS2008P', credit: 2, level: 'diploma', level_id: 2, prerequisites: [], corequisites: ['BSCS2008'], course_type: 'project' ,difficulty:3.16},
    { name: 'Business Analytics', course_id: 'BSMS2002', credit: 4, level: 'diploma', level_id: 2, prerequisites: ['BSMS2001'], corequisites: [], course_type: 'theory' ,difficulty:2.44},
    { name: 'Tools in Data Science', course_id: 'BSSE2002', credit: 3, level: 'diploma', level_id: 2, prerequisites: [], corequisites: ['BSCS2004',], course_type: 'theory',difficulty:2.15 }
];


export default iitCourses