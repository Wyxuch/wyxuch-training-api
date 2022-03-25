import { FC, MouseEventHandler } from 'react';
import './style.scss'

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: 'submit'
    label: string;
    className?: string;
    wrapperClassName?: string;
}

export const Button: FC<ButtonProps> = ({onClick, type, label, className, wrapperClassName}) => {
    return (
        <div className={wrapperClassName}>
            <button onClick={onClick} type={type} className={`default-button ${className}`}>{label}</button>
        </div>
    )
}