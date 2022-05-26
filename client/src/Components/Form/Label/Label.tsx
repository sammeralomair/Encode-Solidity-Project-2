import styles from './Label.module.scss';

interface LabelProps {
    for?: string,
    label?: string
}

export default function Label({ for: htmlFor, label } : LabelProps) {
    if (!label) {
        return <></>
    }

    return (
        <label className={styles.label} htmlFor={htmlFor}>{ label }</label>
    );
}