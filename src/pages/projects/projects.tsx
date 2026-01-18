import { FaCode } from 'react-icons/fa';
import './projects.scss';
import SectionTitle from '../../components/section-title/section-title';
import { projectsData } from '../../data/projects';
import ProjectCard from '../../components/project-card/project-card';


type ProjectsProps = {
    children?: React.ReactNode;
};

export default function Projects(props: ProjectsProps) {
    return (
        <div id='projects' className='projects-container'>
            <SectionTitle title="Projects" icon={FaCode} />
            <div className='projects-grid'>
                {projectsData.length > 0 && projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            {props.children}
        </div>
    );
}
