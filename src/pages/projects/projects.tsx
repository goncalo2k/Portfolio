import { FaCode } from 'react-icons/fa';
import './projects.scss';
import SectionTitle from '../../components/section-title/section-title';


type ProjectsProps = {
    children?: React.ReactNode;
};

export default function Projects(props: ProjectsProps) {
    return (
        <>
            <div id='projects' className='projects-container'>
                <SectionTitle title="Projects" icon={FaCode} />
                {props.children}
            </div>
        </>
    );
}
