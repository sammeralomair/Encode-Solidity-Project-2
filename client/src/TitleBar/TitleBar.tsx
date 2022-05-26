import Button from '../Components/Button/Button';
import { useConnectWallet, useEthereumContext } from '../Utils/EthersUtils';
import styles from './TitleBar.module.scss';

export default function TitleBar() {
    const { account } = useEthereumContext();
    const connectWallet = useConnectWallet();

    return (
    <div className={styles.titleBar}>
        <div className={styles.title}>
            Project 2 - Tweeter DAO
        </div>
        { !account && ( 
            <Button
                value='Connect Wallet'
                onClick={() => connectWallet()}
            />
        )}
        { account && "connected"}
    </div>
    )
}