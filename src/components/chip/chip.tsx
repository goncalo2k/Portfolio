import './chip.scss';


type ChipProps = {
    text: string
};

export default function Chip(props: ChipProps) {
    return (
        <>
            <div className='chip-container button no-pointer'>
                <span className='text-content'>{props.text}</span>
            </div>
        </>
    );
}
