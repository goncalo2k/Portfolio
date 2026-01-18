import { FaGraduationCap } from 'react-icons/fa';
import './education.scss';
import SectionTitle from '../../components/section-title/section-title';
import { educationData } from '../../data/education';
import EducationCard from '../../components/education-card/education-card';

type EducationProps = {
    children?: React.ReactNode;
};

export default function Education(props: EducationProps) {
    return (
        <div id='education' className='education-container'>
            <SectionTitle title="Education" icon={FaGraduationCap} />
            <div className='education-entry-list-container'>
                {educationData.length > 0 && educationData.map((education) => (
                    <EducationCard className='education-card' key={education.id} education={education} />
                ))}
            </div>
            {props.children}
        </div >
    );
}
