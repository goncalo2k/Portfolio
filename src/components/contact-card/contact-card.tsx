import Card from '../card/card';
import type { Contact } from '../../types/contact';
import './contact-card.scss';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

type ContactCardProps = {
    contact: Contact;
    className?: string;
};

const getContactIcon = (type: string) => {
    switch (type) {
        case 'email':
            return FaEnvelope;
        case 'phone':
            return FaPhone;
        case 'linkedin':
            return FaLinkedin;
        case 'github':
            return FaGithub;
        case 'website':
            return FaGlobe;
        default:
            return FaGlobe;
    }
};

export default function ContactCard({ contact, className }: ContactCardProps) {
    const Icon = getContactIcon(contact.type);
    const isClickable = contact.url || contact.type === 'email';

    return (
        <Card className={`contact-card ${className}`}>
            <div className='card-header'>
                <div className='contact-icon'>
                    <Icon />
                </div>
                <div className='contact-info'>
                    <h3 className='contact-label'>{contact.label}</h3>
                    <span className='contact-value'>{contact.value}</span>
                </div>
            </div>
            {isClickable && (
                <>
                    <div className='card-content'>
                        <a 
                            href={contact.url || (contact.type === 'email' ? `mailto:${contact.value}` : undefined)}
                            className='project-link'
                            target='_blank' 
                            rel='noopener noreferrer'
                        >
                            {contact.type === 'email' ? 'Send Message' : 'Visit Profile'}
                        </a>
                    </div>
                </>
            )}
        </Card>
    );
}