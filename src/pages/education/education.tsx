import './education.scss';


type EducationProps = {
    children?: React.ReactNode;
};

export default function Education(props: EducationProps) {
    return (
        <>
            <div id='projects' className='education-container'>
                {props.children}
            </div>
        </>
    );
}
