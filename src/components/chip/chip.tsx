import './chip.scss';


type ChipProps = {
    text: string,
    children?: React.ReactNode,
    isLightText?: boolean,
    isWidthCapped?: boolean,
    hasHover?: boolean,
    isAnimated?: boolean,
    isDateIndicator?: boolean,
};

export default function Chip({ text, children, isLightText = true, isWidthCapped = true, hasHover = true, isAnimated = true, isDateIndicator = false }: ChipProps) {
    return (
        <>
            <div className={'chip-container button no-pointer' + (isLightText ? ' light-text' : '') +
                (isWidthCapped ? ' fixed-width' : '') + (hasHover ? ' hover-animation' : '') + (isAnimated ? ' animated' : '') + (isDateIndicator ? ' date-indicator' : '')}>
                <span className='text-content'>{text}</span> <div className='chip-children-container'>{children}</div>
            </div>
        </>
    );
}
