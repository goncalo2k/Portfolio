export interface Contact {
    id: string;
    type: 'email' | 'phone' | 'linkedin' | 'github' | 'website' | 'other';
    label: string;
    value: string;
    url?: string;
    icon?: string;
}