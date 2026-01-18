import Card from '../card/card';
import type { Education } from '../../types/education';
import './education-card.scss';
import Chip from '../chip/chip';
import Divider from '../divider/divider';

type EducationCardProps = {
    education: Education;
    className?: string;
};

export default function EducationCard({ education, className }: EducationCardProps) {
    return (
        <Card className={`education-card ${className}`}>
            <div className='card-header'>
                <div className='education-info'>
                    <span className='degree-title'>{education.degree}</span>
                    <span className='institution-name'>{education.institution}</span>
                </div>
                <div className='duration-location-info'>
                    <Chip text={`${education.startDate} - ${education.endDate}`} isLightText={false} isWidthCapped={false}
                        hasHover={false} isAnimated={false} isDateIndicator={true}></Chip>
                    <span className='institution-location'>{education.location}</span>
                </div>
            </div>
            <Divider />
            <div className='card-content'>
                <div className='field-info'>
                    <span>Field of Study:</span>
                    <span>{education.field}</span>
                </div>
                {education.gpa && (
                    <div className='gpa-info'>
                        <span>GPA:</span>
                        <span>{education.gpa}</span>
                    </div>
                )}
                {education.achievements && education.achievements.length > 0 && (
                    <div className='achievements-info'>
                        <span>Achievements:</span>
                        <ul className='achievement-list'>
                            {education.achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Card>
    );
}