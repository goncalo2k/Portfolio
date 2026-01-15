import ExperienceCard from '../../components/experience-card/experience-card';
import { experienceData } from '../../data/experience';
import './experience.scss';


type ExperienceProps = {
    children?: React.ReactNode;
};

export default function Experience(props: ExperienceProps) {
    return (
        <>
            <div id='experience' className='experience-container'>
                {experienceData.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                ))}
                {props.children}
            </div>
        </>
    );
}
