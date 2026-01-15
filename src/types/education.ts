export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    location: string;
    gpa?: string;
    achievements?: string[];
}