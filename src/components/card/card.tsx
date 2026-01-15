import './card.scss';


type CardProps = {
    children?: React.ReactNode;
    className?: string;
};

export default function Card(props: CardProps) {
    return (
        <div className={`card-container ${props.className}`}>
            {props.children}
        </div>
    );
}
