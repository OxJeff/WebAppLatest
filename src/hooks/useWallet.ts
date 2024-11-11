import { useState, useCallback, useEffect } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import toast from 'react-hot-toast';

export interface WalletState {
  address: string | null;
  isConnecting: boolean;
  signer: JsonRpcSigner | null;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    signer: null,
  });

  const checkWalletConnection = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      return false;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletState({ address, isConnecting: false, signer });
        return true;
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
    return false;
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Please install MetaMask to connect your wallet!');
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, isConnecting: true }));
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setWalletState({ address, isConnecting: false, signer });
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  };

  useEffect(() => {
    checkWalletConnection();

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => {
        checkWalletConnection();
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners();
      }
    };
  }, [checkWalletConnection]);

  return {
    ...walletState,
    connectWallet,
  };
}

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeAllListeners: () => void;
    };
  }
}