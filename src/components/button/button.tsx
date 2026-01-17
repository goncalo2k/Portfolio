import { ButtonType } from './button.consts';
import './button.scss';



type ButtonProps = {
    className?: string
    textContent?: string
    type?: ButtonType;
    children?: React.ReactNode
    minSizeActive?: boolean;
    onClick?: () => void;
    href?: string;
}

export default function Button({ className, textContent = '',
    type = ButtonType.Primary,
    children,
    minSizeActive = true,
    onClick,
    href }: ButtonProps) {

    const handleClick = () => {
        if (href) {
            window.open(href, '_blank');
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <div className={'button button-container' + (minSizeActive ? ' -min-width' : '') + ' ' + type + ' ' + className} onClick={handleClick}>
            {textContent && <span className='text-content'>{textContent}</span>}
            {children}
        </div>
    );
}
