import './chip.scss';


type ChipProps = {
    text: string
    isLightText?: boolean,
    isWidthCapped?: boolean,
    hasHover?: boolean,
    isAnimated?: boolean
};

export default function Chip({ text, isLightText = true, isWidthCapped = true, hasHover = true, isAnimated = true }: ChipProps) {
    return (
        <>
            <div className={'chip-container button no-pointer' + (isLightText ? ' light-text' : '') + 
                (isWidthCapped ? ' fixed-width' : '') + (hasHover ? ' hover-animation' : '') + (isAnimated ? ' animated' : '')}>
                <span className='text-content'>{text}</span>
            </div>
        </>
    );
}
