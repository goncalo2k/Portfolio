import './card.scss';


type CardProps = {
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
};

Card.Title = function CardTitle({ children }: any) {
    return <div className='card-title'>
        {children}
    </div>;
};

export default function Card(props: CardProps) {
	const handleClick = props.onClick ? () => props.onClick?.() : undefined;
	return (
		<div className={`card-container${props.className ? ' ' + props.className : ''}`} onClick={handleClick}>
			{props.children}
		</div>
	);
}
