import { HiOutlineMail } from 'react-icons/hi';
import Chip from '../chip/chip';
import './section-title.scss';
import Button from '../button/button';

type SectionTitleProps = {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    className?: string;
};

export default function SectionTitle({ title, icon: Icon, className }: SectionTitleProps) {
    return (
        <div className={`section-title-container ${className || ''}`}>
            <Button className='section-title-chip' type='chip' minSizeActive={false}>
                <Icon className='section-title-icon' />
            </Button>
            <span className='section-title'>{title}</span>
        </div>
    );
}