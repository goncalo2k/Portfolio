import './contacts.scss';
import SectionTitle from '../../components/section-title/section-title';
import { contactsData } from '../../data/contacts';
import ContactCard from '../../components/contact-card/contact-card';
import { IoIosSend } from 'react-icons/io';


type ContactsProps = {
    children?: React.ReactNode;
};

export default function Contacts(props: ContactsProps) {
    return (
        <div id='contacts' className='contacts-container'>
            <SectionTitle title="Contacts" subTitle="I'm always looking to grow and learn more. I'm also always very interested in learning about new, inovating projects! Feel free to  reach out if you would like to connect!" icon={IoIosSend} />
            <div className='contacts-grid'>
                {contactsData.length > 0 && contactsData.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
            {props.children}
        </div>
    );
}
