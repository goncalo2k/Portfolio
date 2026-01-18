import ExperienceCard from '../../components/experience-card/experience-card';
import './extracurriculars.scss';
import SectionTitle from '../../components/section-title/section-title';
import { LuBriefcase } from 'react-icons/lu';
import { extraCurricularsData } from '../../data/extracurriculars';


type ExtracurricularsProps = {
    children?: React.ReactNode;
};

export default function Extracurriculars(props: ExtracurricularsProps) {
    return (
        <>
            <div id='extracurriculars' className='extracurriculars-container'>
                <SectionTitle title="Extracurriculars" icon={LuBriefcase} />
                {extraCurricularsData.length > 0 && extraCurricularsData.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                ))}
                {props.children}
            </div>
        </>
    );
}
