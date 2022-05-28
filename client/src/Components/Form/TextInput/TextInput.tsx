import clsx from 'clsx';
import styles from './TextInput.module.scss';

interface TextInputProps {
    id?: string,
    value: string,
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    disabled?: boolean
}

export default function TextInput({ id, value, placeholder, disabled, onChange, onKeyDown } : TextInputProps) {
    return (
        <input id={id} className={getStyles(disabled)} disabled={disabled} placeholder={placeholder} type="text" value={value} onChange={onChange} onKeyDown={(e) => onKeyDown && onKeyDown(e)} />
    )
}

function getStyles(disabled?: boolean) {
    return clsx({
        [styles.textInput]: true,
        [styles.disabled]: disabled
    })
}
