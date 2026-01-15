import { ButtonType } from './button.consts';
import './button.scss';



type ButtonProps = {
    className?: string
    textContent?: string
    type?: ButtonType;
    children?: React.ReactNode
    minSizeActive?: boolean;
}

export default function Button({ className, textContent = '',
    type = ButtonType.Primary,
    children,
    minSizeActive = true }: ButtonProps) {
    return (
        <div className={'button button-container' + (minSizeActive ? ' -min-width' : '') + ' ' + type + ' ' + className}>
            <span className='text-content'>{textContent}</span>
            {children}
        </div>
    );
}
