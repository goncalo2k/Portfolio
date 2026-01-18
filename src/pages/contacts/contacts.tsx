import { FaEnvelope } from 'react-icons/fa';
import './contacts.scss';
import SectionTitle from '../../components/section-title/section-title';
import { contactsData } from '../../data/contacts';
import ContactCard from '../../components/contact-card/contact-card';


type ContactsProps = {
    children?: React.ReactNode;
};

export default function Contacts(props: ContactsProps) {
    return (
        <div id='contacts' className='contacts-container'>
            <SectionTitle title="Contacts" icon={FaEnvelope} />
            <div className='contacts-grid'>
                {contactsData.length > 0 && contactsData.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
            {props.children}
        </div>
    );
}
