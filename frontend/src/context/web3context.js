import { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      setError(null);
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this feature');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // Create ethers provider
      const provider = new BrowserProvider(window.ethereum);
      
      // Get network info
      const network = await provider.getNetwork();
      
      // Check if we're on the right network (e.g., Mumbai testnet)
      if (network.chainId !== 80001n) { // Mumbai testnet
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }], // Mumbai testnet
          });
        } catch (switchError) {
          // If Mumbai testnet is not added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x13881',
                chainName: 'Mumbai Testnet',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com']
              }]
            });
          } else {
            throw switchError;
          }
        }
      }

      setAccount(accounts[0]);
      setProvider(provider);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError(error.message);
      alert(error.message);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAccount(null);
      setProvider(null);
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    // Reload the page when the chain changes
    window.location.reload();
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          
          if (accounts.length > 0) {
            const provider = new BrowserProvider(window.ethereum);
            setAccount(accounts[0]);
            setProvider(provider);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          setError(error.message);
        }
      }
      setIsLoading(false);
    };

    checkWalletConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{ 
      account, 
      provider,
      connectWallet, 
      isLoading,
      error 
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};