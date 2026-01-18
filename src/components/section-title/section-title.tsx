import './section-title.scss';
import Button from '../button/button';

type SectionTitleProps = {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    subTitle?: String;
    className?: string;
};

export default function SectionTitle({ title, subTitle, icon: Icon, className }: SectionTitleProps) {
    return (
        <div className={`section-title-container ${className || ''}`}>
            <Button className='section-title-chip' type='chip' minSizeActive={false}>
                <Icon className='section-title-icon' />
            </Button>
            <div className='title-text-container'>
                <span className='section-title'>{title}</span>
                <span className='section-sub-title'>{subTitle}</span>
            </div>
        </div>
    );
}