
import Card from '../card/card';
import './card.scss';


type ExperienceCardProps = {
    children?: React.ReactNode;
    className?: string;
    description?: string[]
};

export default function ExperienceCard({ children, className, description = [] }: ExperienceCardProps) {
    return (
        <Card>
            <div className={`card-header ${className}`}>
                <div className='experience-title-container'>
                    <span className='position-title-label'></span>
                    <span className='company-label'></span>
                </div>
                <div>
                    <ul>
                        {description.map((descriptionEntry) =>
                            <li>{descriptionEntry}</li>
                        )}
                    </ul>
                </div>
                <span className='duration-label'></span>
            </div>
        </Card>
    );
}
