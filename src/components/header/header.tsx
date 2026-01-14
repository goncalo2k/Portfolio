import './header.scss';


type HeaderProps = {
    children?: React.ReactNode;
};

export default function Header(props: HeaderProps) {
    return (
        <>
            <div className='header-container'>
                <span className='label link'>Home</span>
                <span className='label link'>Experience</span>
                <span className='label link'>Education</span>
                <span className='label link'>Projects</span>
                <span className='label link'>Contacts</span>
                {props.children}
            </div>
        </>
    );
}
