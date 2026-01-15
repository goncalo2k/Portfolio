
import Card from '../card/card';
import type { Experience } from '../../types/experience';
import './experience-card.scss';
import Chip from '../chip/chip';

type ExperienceCardProps = {
    experience: Experience;
    className?: string;
};

export default function ExperienceCard({ experience, className }: ExperienceCardProps) {
    return (
        <Card className={`experience-card ${className}`}>
            <div className='card-header'>
                <div className='experience-info'>
                    <span className='position-title'>{experience.position}</span>
                    <span className='company-name-location'>{experience.company} - {experience.location}</span>
                </div>
                <div className='duration-info'>
                    <Chip text={`${experience.startDate} - ${experience.endDate}`} isLightText={false} isWidthCapped={false}
                        hasHover={false} isAnimated={false}></Chip>
                </div>
            </div>
            <div className='card-content'>
                <p className='description'>{experience.description}</p>
                <div className='responsibilities'>
                    <h5>Responsibilities:</h5>
                    <ul>
                        {experience.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </div>
                {experience.technologies && experience.technologies.length > 0 && (
                    <div className='technologies'>
                        <h5>Technologies:</h5>
                        <p>{experience.technologies.join(', ')}</p>
                    </div>
                )}
            </div>
        </Card>
    );
}
