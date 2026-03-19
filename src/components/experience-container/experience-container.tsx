import type { Experience } from '../../types/experience';
import Card from '../card/card';
import Expandable from '../expandable/expandable';
import './experience-container.scss';

type ExperienceContainerProps = {
    experiences: Experience[];
};

export default function ExperienceContainer({ experiences }: ExperienceContainerProps) {
    return (
        <Card>
            <Card.Title>
                Work Experience
            </Card.Title>
            {
                experiences.map((experience) =>
                    <div key={experience.id} className='experience-container'>
                        <Expandable className='experience-card' experience={experience}></Expandable>
                    </div>
                )
            }
        </Card>
    );
}
