import React, { useState } from 'react';
import { ethers} from "ethers";

const WalletManager = () => {
  const [wallet, setWallet] = useState(null);
  const [mnemonic, setMnemonic] = useState('');

  const createWallet = () => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);
    setMnemonic(newWallet.mnemonic.phrase);
  };

  const importWallet = (phrase) => {
    try {
      const importedWallet = ethers.Wallet.fromMnemonic(phrase);
      setWallet(importedWallet);
    } catch (error) {
      alert('Invalid mnemonic');
    }
  };

  return (
    <div className="mt-4">
      <button className="btn btn-primary" onClick={createWallet}>
        Create Wallet
      </button>
      {wallet && (
        <div className="mt-3">
          <h5>Wallet Address:</h5>
          <p>{wallet.address}</p>
          <h5>Mnemonic:</h5>
          <p>{mnemonic}</p>
        </div>
      )}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter mnemonic to import"
          className="form-control"
          onChange={(e) => setMnemonic(e.target.value)}
        />
        <button
          className="btn btn-secondary mt-2"
          onClick={() => importWallet(mnemonic)}
        >
          Import Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletManager;
