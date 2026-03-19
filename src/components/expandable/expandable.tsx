import { FaChevronDown } from 'react-icons/fa';
import type { Experience } from '../../types/experience';
import Card from '../card/card';
import './expandable.scss';
import { useState } from 'react';

type ExperienceCardProps = {
    experience: Experience;
    className?: string;
};

Expandable.Header = function ExpandableHeader({ children }: any) {
    return <div className='expandable-header'>
        {children}
    </div>;
};

Expandable.Body = function ExpandableBody({ children }: any) {
    return <div className='expandable-body'>
        {children}
    </div>;
};

export default function Expandable({ experience, className }: ExperienceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className={'expandable-container' + (isExpanded ? ' expanded' : '') + ' ' + className} onClick={() => setIsExpanded(!isExpanded)} >
            <Expandable.Header>
                <div className='expandable-header-row'>
                    <div className='logo-container'><img className='logo' src={experience.companyLogoUrl} alt={experience.company + '\'s logo'} /></div>
                    <div className='expandable-content'>
                        <div className='expandable-header-column'>
                            <div className='expandable-header-row expandable-title-row'>
                                <span className='position-label'>{experience.position}</span>
                                <div className={'expandable-icon' + (isExpanded ? ' expanded' : '')}><FaChevronDown /></div>
                            </div>
                            <div className='expandable-header-column'>
                                <span className='text secondary experience-info-text'>{experience.company} · {experience.startDate} - {experience.startDate}</span>
                            </div>
                        </div>
                        <Expandable.Body>
                            <div className={"expandable-body-container" + (isExpanded ? ' expanded' : '')} >
                                <span className='text description-text secondary'>{experience.description}</span>
                            </div>
                        </Expandable.Body>
                    </div>
                </div>
            </Expandable.Header>
        </ Card>
            );
}
