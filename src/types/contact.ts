export interface Contact {
    id: string;
    type: ContactType;
    label: string;
    value: string;
    icon?: string;
}

export const ContactType = {
    Email: 'email',
    Phone: 'phone',
    Loc: 'location'
} as const;

export type ContactType = typeof ContactType[keyof typeof ContactType];