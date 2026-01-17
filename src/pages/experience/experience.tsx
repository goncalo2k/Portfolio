import ExperienceCard from '../../components/experience-card/experience-card';
import { experienceData } from '../../data/experience';
import './experience.scss';
import SectionTitle from '../../components/section-title/section-title';
import { LuBriefcase } from 'react-icons/lu';


type ExperienceProps = {
    children?: React.ReactNode;
};

export default function Experience(props: ExperienceProps) {
    return (
        <>
            <div id='experience' className='experience-container'>
                <SectionTitle title="Experience" icon={LuBriefcase} />
                {experienceData.length > 0 && experienceData.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                ))}
                {props.children}
            </div>
        </>
    );
}
