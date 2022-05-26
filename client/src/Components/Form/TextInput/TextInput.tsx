import styles from './TextInput.module.scss';

interface TextInputProps {
    id?: string,
    value: string,
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function TextInput({ id, value, placeholder, onChange } : TextInputProps) {
    return (
        <input id={id} className={styles.textInput} placeholder={placeholder} type="text" value={value} onChange={onChange} />
    )
}
