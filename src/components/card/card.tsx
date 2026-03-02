import './card.scss';


type CardProps = {
    children?: React.ReactNode;
    className?: string;
};

Card.Title = function CardTitle({ children }: any) {
    return <div className='card-title'>
        {children}
    </div>;
};

export default function Card(props: CardProps) {
    return (
        <div className={`card-container${props.className ? ' ' + props.className : ''}`}>

            {props.children}
        </div>
    );
}
