import React, { useState, createContext, useContext } from "react";

export type EthereumWallet = {
    account: any,
    setAccount: (a: any) => void
}

export const EthereumContext = createContext<EthereumWallet>({
    account: null,
    setAccount: () => {}
});

export function useEthereumContext() { 
    return useContext(EthereumContext); 
}

interface EthereumProviderProps {
    children?: React.ReactNode
}

export function EthereumProvider({ children } : EthereumProviderProps) {
    const [currentAccount, setCurrentAccount] = useState();

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window as any;

            if (!ethereum) {
                alert("Make sure you install metamask");
                return ;
            }

            const accounts = await ethereum.request({method: "eth_accounts"});

            if (accounts.length !== 0) {
                setCurrentAccount(accounts[0]);
            }

            console.log("no authorized user found")
        } catch(e) {
            console.error(e);
        }
    }

    return (
    <EthereumContext.Provider value={{account: currentAccount, setAccount: setCurrentAccount}}>
        { children }
    </EthereumContext.Provider>
    );
}

export const useConnectWallet = () => {
    const { setAccount } = useEthereumContext();

    const connectWallet = async () => {    
        try {
            const { ethereum } = window as any;
    
            if (!ethereum) {
            alert("Get MetaMask!");
            }
    
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
            setAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    return connectWallet;
}