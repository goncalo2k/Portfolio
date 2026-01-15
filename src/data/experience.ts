import type { Experience } from '../types/experience';

export const experienceData: Experience[] = [
    {
        id: 'exp-1',
        company: 'Deloitte',
        position: 'Software Engineer - Tech Consultant',
        startDate: 'September 2024',
        endDate: 'Moment',
        current: true,
        location: 'Lisbon, Portugal',
        description: 'Developing cutting edge, innovative solutions for the banking and insurance industries',
        responsibilities: [
            'Responsible for developing cutting edge, innovative solutions for the banking and insurance industries, while also using frameworks such as Angular and React for frontend development and Java Spring Boot and Node.JS for backend solutions, while also utilizing event driven frameworks such as Kafka and relational databases.',
            'Responsible for managing the Frontend team for certain periods of time.',
            'Responsible for mentoring entry-level team members and fostering their growth, while helping management to oversee the project\'s backlog.',
            'Responsible for client interaction and requirement gathering.'
        ],
        technologies: ['Angular', 'React', 'Java Spring Boot', 'Node.JS', 'Kafka', 'Relational Databases']
    },
    {
        id: 'exp-2',
        company: 'Deloitte',
        position: 'Software Engineer - Intern',
        startDate: 'February 2024',
        endDate: 'July 2024',
        current: false,
        location: 'Porto, Portugal',
        description: 'Developing insurance services-related app and integrations',
        responsibilities: [
            'Responsible for developing an insurance services-related app, using Flutter, Node.JS, DynamoDB and MongoDB.',
            'Responsible for the development of integrations with external services, such as Salesforce.',
            'Responsible for the database migration of the project, and for the technology shift performed regarding the databases.'
        ],
        technologies: ['Flutter', 'Node.JS', 'DynamoDB', 'MongoDB', 'Salesforce']
    },
    {
        id: 'exp-3',
        company: 'Deloitte',
        position: 'Salesforce Developer Intern',
        startDate: 'July 2023',
        endDate: 'July 2023',
        current: false,
        location: 'Porto, Portugal',
        description: 'Developed Salesforce solutions and became certified',
        responsibilities: [
            'Developed Salesforce solutions, while becoming a Certified Salesforce Associate.'
        ],
        technologies: ['Salesforce']
    }
];