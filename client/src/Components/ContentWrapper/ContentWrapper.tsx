import styles from './ContentWrapper.module.scss';

interface ContentWrapperProps {
    children?: React.ReactNode
}

export default function ContentWrapper({ children } : ContentWrapperProps) {
    return (
    <div className={styles.contentBlock}>
        { children }
    </div>
    )
}