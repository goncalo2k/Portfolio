import './button.scss';

type ButtonProps = {
    textContent: string
    children?: React.ReactNode
}

export default function Button(props: ButtonProps) {
    return (
        <div className='button button-container'>
            <span className='text-content'>{props.textContent}</span>
            {props.children}
        </div>
    );
}
