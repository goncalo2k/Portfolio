import './projects.scss';


type ProjectsProps = {
    children?: React.ReactNode;
};

export default function Projects(props: ProjectsProps) {
    return (
        <>
            <div id='projects' className='projects-container'>
                {props.children}
            </div>
        </>
    );
}
