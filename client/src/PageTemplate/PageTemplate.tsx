import TitleBar from '../TitleBar/TitleBar';
import styles from './PageTemplate.module.scss';

interface PageTemplateProps {
    children?: React.ReactNode
}

export default function PageTemplate({ children } : PageTemplateProps) {
    return (
    <div className={styles.app}>
        <TitleBar />
        <div>
        { children }
        </div>
    </div>
    )
}