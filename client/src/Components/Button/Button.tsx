import styles from './Button.module.scss';

interface ButtonProps {
    value: string,
    onClick: () => void
}

export default function Button({ value, onClick } : ButtonProps) {
    return (
    <div className={styles.button} onClick={onClick}>
        {value}
    </div>
    )
}