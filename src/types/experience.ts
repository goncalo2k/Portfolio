export interface Experience {
    id: string;
    company: string;
    companyLogoUrl: string;
    position: string;
    startDate: string;
    endDate: string;
    current?: boolean;
    location: string;
    description: string;
    responsibilities: string[];
    technologies?: string[];
}