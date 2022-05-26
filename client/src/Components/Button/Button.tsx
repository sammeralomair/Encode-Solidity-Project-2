import clsx from 'clsx';
import styles from './Button.module.scss';

export enum ButtonStyle {
    Primary,
    Secondary
}

interface ButtonProps {
    value: string,
    onClick: () => void,
    buttonStyle?: ButtonStyle,
    className?: string
}

export default function Button({ 
    value, 
    onClick, 
    buttonStyle = ButtonStyle.Primary, 
    className
} : ButtonProps) {
    return (
    <div className={getButtonStyle(buttonStyle, className)} onClick={onClick}>
        {value}
    </div>
    )
}

function getButtonStyle(buttonStyle: ButtonStyle, className?: string) {
    return clsx({
        [styles.button]: true,
        [styles.primary]: buttonStyle === ButtonStyle.Primary,
        [styles.secondary]: buttonStyle === ButtonStyle.Secondary,
        [className ?? '']: className
    })
}