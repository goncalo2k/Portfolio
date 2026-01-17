import { FaEnvelope } from 'react-icons/fa';
import './contacts.scss';
import SectionTitle from '../../components/section-title/section-title';


type ContactsProps = {
    children?: React.ReactNode;
};

export default function Contacts(props: ContactsProps) {
    return (
        false && <div id='contacts' className='contacts-container'>
            <SectionTitle title="Contacts" icon={FaEnvelope} />
            {props.children}
        </div>
    );
}
