import Card from '../../components/card/card';
import './experience.scss';


type ExperienceProps = {
    children?: React.ReactNode;
};

export default function Experience(props: ExperienceProps) {
    return (
        <>
            <div id='experience' className='experience-container'>
                <ExperienceCard><span>dawdawdaw</span></ExperienceCard>
                {props.children}
            </div>
        </>
    );
}
