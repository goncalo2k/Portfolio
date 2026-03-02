import './card.scss';


type CardProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: any;
};

Card.Title = function CardTitle({ children }: any) {
    return <div className='card-title'>
        {children}
    </div>;
};

export default function Card(props: CardProps) {
    return (
        <div className={`card-container${props.className ? ' ' + props.className : ''}`} onClick={() => props.onClick()}>
            {props.children}
        </div>
    );
}
