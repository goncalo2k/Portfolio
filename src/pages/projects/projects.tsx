import { FaCode } from 'react-icons/fa';
import './projects.scss';
import SectionTitle from '../../components/section-title/section-title';
import { projectsData } from '../../data/projects';


type ProjectsProps = {
    children?: React.ReactNode;
};

export default function Projects(props: ProjectsProps) {
    return (
        projectsData.length > 0 && <div id='projects' className='projects-container'>
            <SectionTitle title="Projects" icon={FaCode} />
            {props.children}
        </div>
    );
}
