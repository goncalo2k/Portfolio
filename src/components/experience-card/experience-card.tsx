
import Card from '../card/card';
import type { Experience } from '../../types/experience';
import './experience-card.scss';
import Chip from '../chip/chip';
import Divider from '../divider/divider';

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
                    <span className='company-name'>{experience.company}</span>
                </div>
                <div className='duration-location-info'>
                    <Chip text={`${experience.startDate} - ${experience.endDate}`} isLightText={false} isWidthCapped={false}
                        hasHover={false} isAnimated={false} isDateIndicator={true}></Chip>
                    <span className='company-location'>{experience.location}</span>
                </div>
            </div>
            <Divider />
            <div className='card-content'>
                <div className='description'>
                    <span>Responsibilities:</span>
                    <ul className='responsibility-list'>
                        {experience.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </div>
                {experience.technologies && experience.technologies.length > 0 && (
                    <div className='technology-container'>
                        <span>Technologies:</span>
                        <div className='technology-list'>
                            {experience.technologies.map((experience) => <Chip text={experience} />)}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
