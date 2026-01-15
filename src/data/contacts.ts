import type { Contact } from '../types/contacts';

export const contactsData: Contact[] = [
    {
        id: 'contact-1',
        type: 'email',
        label: 'Email',
        value: 'goncalo.miranda.importante@gmail.com',
        url: 'mailto:goncalo.miranda.importante@gmail.com'
    },
    {
        id: 'contact-2',
        type: 'phone',
        label: 'Phone',
        value: '+351 938646702'
    },
    {
        id: 'contact-3',
        type: 'linkedin',
        label: 'LinkedIn',
        value: 'in/goncalogmiranda/',
        url: 'https://www.linkedin.com/in/goncalogmiranda/'
    },
    {
        id: 'contact-4',
        type: 'github',
        label: 'GitHub',
        value: 'github.com/goncalo2k',
        url: 'https://github.com/goncalo2k'
    }
];