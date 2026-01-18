import Card from '../card/card';
import './project-card.scss';
import Divider from '../divider/divider';
import Chip from '../chip/chip';
import type { Project } from '../../types/project';

type ProjectCardProps = {
    project: Project;
    className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
    return (
        <Card className={`project-card ${className}`}>
            <div className='card-header'>
                <div className='project-image'>
                    {project.image && <project.image className='project-icon'/>}
                </div>
                <div className='project-info'>
                    <h3 className='project-title'>{project.name}</h3>
                    <a href={project.url} className='project-link' target='_blank' rel='noopener noreferrer'>
                        View Project
                    </a>
                    <a href={project.codeUrl} className='project-link' target='_blank' rel='noopener noreferrer'>
                        View Code
                    </a>
                </div>
            </div>
            <Divider />
            <div className='card-content'>
                <p className='project-description'>{project.description}</p>

                {project.technologies && project.technologies.length > 0 && (
                    <div className='technology-container'>
                        <span>Technologies/Tooling:</span>
                        <div className='technology-list'>
                            {project.technologies.map((technology, index) => <Chip key={index} text={technology} />)}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}