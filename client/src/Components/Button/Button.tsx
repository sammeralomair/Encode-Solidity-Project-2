import clsx from 'clsx';
import styles from './Button.module.scss';

export enum ButtonStyle {
    Primary,
    Secondary
}

interface ButtonProps {
    value: string,
    onClick?: () => void,
    buttonStyle?: ButtonStyle,
    className?: string,
    isLoading?: boolean
}

export default function Button({ 
    value, 
    onClick, 
    buttonStyle = ButtonStyle.Primary, 
    className,
    isLoading
} : ButtonProps) {
    const _onClick = () => {
        if (isLoading) {
            return;
        }

        if (onClick) {
            onClick();
        }
    }

    return (
    <div className={getButtonStyle(buttonStyle, isLoading, className)} onClick={_onClick}>
        {!isLoading && value}
    </div>
    )
}

function getButtonStyle(buttonStyle: ButtonStyle, isLoading?: boolean, className?: string) {
    return clsx({
        [styles.button]: true,
        [styles.primary]: buttonStyle === ButtonStyle.Primary,
        [styles.secondary]: buttonStyle === ButtonStyle.Secondary,
        [styles.disabled]: isLoading,
        [styles.loading]: isLoading,
        [className ?? '']: className
    })
}