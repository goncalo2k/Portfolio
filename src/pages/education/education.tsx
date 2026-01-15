import './education.scss';


type EducationProps = {
    children?: React.ReactNode;
};

export default function Education(props: EducationProps) {
    return (
        <>
            <div id='education' className='education-container'>
                {props.children}
            </div>
        </>
    );
}
