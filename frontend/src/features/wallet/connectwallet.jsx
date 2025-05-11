import React, { useState } from "react";
import { BrowserProvider } from "ethers";

const ConnectWallet = () => {
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      <h1>Crypto Wallet</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {address && <p>Connected Address: {address}</p>}
    </div>
  );
};

export default ConnectWallet;
