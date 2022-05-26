import styles from './FormGroup.module.scss';

interface FormGroupProps {
    children?: React.ReactNode
}

export default function FormGroup({ children } : FormGroupProps) {
    return (
    <div className={styles.formGroup}>
        { children }
    </div>
    )
}