import Button from '../Components/Button/Button';
import styles from './TitleBar.module.scss';

export default function TitleBar() {
    return (
    <div className={styles.titleBar}>
        <div className={styles.title}>
            Project 2 - Tweeter DAO
        </div>
        <Button
            value='Connect Wallet'
            onClick={() => alert("connecting")}
        />
    </div>
    )
}