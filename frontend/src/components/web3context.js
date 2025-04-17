// import { createContext, useContext, useState, useEffect } from 'react';

// const Web3Context = createContext();

// export const Web3Provider = ({ children }) => {
//   const [account, setAccount] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const connectWallet = async () => {
//     try {
//       if (window.ethereum) {
//         const accounts = await window.ethereum.request({ 
//           method: 'eth_requestAccounts' 
//         });
//         setAccount(accounts[0]);
//       } else {
//         alert('Please install MetaMask!');
//       }
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//     }
//   };

//   useEffect(() => {
//     const checkWalletConnection = async () => {
//       if (window.ethereum) {
//         try {
//           const accounts = await window.ethereum.request({ 
//             method: 'eth_accounts' 
//           });
//           if (accounts.length > 0) {
//             setAccount(accounts[0]);
//           }
//         } catch (error) {
//           console.error("Error checking wallet connection:", error);
//         }
//       }
//       setIsLoading(false);
//     };

//     checkWalletConnection();

//     // Listen for account changes
//     if (window.ethereum) {
//       window.ethereum.on('accountsChanged', (accounts) => {
//         setAccount(accounts[0] || null);
//       });
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener('accountsChanged');
//       }
//     };
//   }, []);

//   return (
//     <Web3Context.Provider value={{ account, connectWallet, isLoading }}>
//       {children}
//     </Web3Context.Provider>
//   );
// };

// export const useWeb3 = () => {
//   const context = useContext(Web3Context);
//   if (!context) {
//     throw new Error('useWeb3 must be used within a Web3Provider');
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect } from 'react';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts[0] || null);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
      setIsLoading(false);
    };

    checkWalletConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{ account, connectWallet, isLoading }}>
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