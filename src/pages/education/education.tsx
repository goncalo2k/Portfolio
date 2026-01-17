import { FaGraduationCap } from 'react-icons/fa';
import './education.scss';
import SectionTitle from '../../components/section-title/section-title';


type EducationProps = {
    children?: React.ReactNode;
};

export default function Education(props: EducationProps) {
    return (
        <>
            <div id='education' className='education-container'>
                <SectionTitle title="Education" icon={FaGraduationCap} />
                {props.children}
            </div>
        </>
    );
}
