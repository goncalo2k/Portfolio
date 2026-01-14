import './card.scss';


type CardProps = {
    children?: React.ReactNode;
};

export default function Card(props: CardProps) {
    return (
        <>
            <div className='card-container'>
                {props.children}
            </div>
        </>
    );
}
