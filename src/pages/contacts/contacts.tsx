import './contacts.scss';


type ContactsProps = {
    children?: React.ReactNode;
};

export default function Contacts(props: ContactsProps) {
    return (
        <>
            <div id='contacts' className='contacts-container'>
                {props.children}
            </div>
        </>
    );
}
