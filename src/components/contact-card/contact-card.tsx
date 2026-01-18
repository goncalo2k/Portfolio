import Card from '../card/card';
import type { Contact } from '../../types/contact';
import { ContactType } from '../../types/contact';
import './contact-card.scss';
import { FaEnvelope, FaPhone, } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Chip from '../chip/chip';

type ContactCardProps = {
    contact: Contact;
    className?: string;
};

const getContactIcon = (type: ContactType) => {
    switch (type) {
        case ContactType.Email:
            return FaEnvelope;
        case ContactType.Phone:
            return FaPhone;
        case ContactType.Loc:
            return IoLocationOutline;
        default:
            return FaEnvelope;
    }
};

export default function ContactCard({ contact, className }: ContactCardProps) {
    const Icon = getContactIcon(contact.type);

    const getHrefLink = (contact: Contact) => {
        switch (contact.type) {
            case ContactType.Email:
                return `mailto:${contact.value}`;
            case ContactType.Phone:
                return `tel:${contact.value}`;
            default:
                return undefined
        }
    };


    return (
        <Card className={`contact-card ${className}`}>
            <Chip text={''}><Icon /></Chip>
            <div className='card-content-container'>
                <div className='contact-info'>
                    <span className='contact-label' >{contact.label}</span>
                    <a className='contact-value link' href={getHrefLink(contact)} >{contact.value}</a>
                </div>

            </div>
        </Card>
    );
}