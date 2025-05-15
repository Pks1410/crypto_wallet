import React, { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import { BrowserProvider, Contract } from "ethers";
import contractABI from "./MyNFT_ABI.json"; // Save your ABI as this file
import axios from "axios";

const CONTRACT_ADDRESS = "0x30305211d514e3cC3C19b64502B60C6Fb9adD5D6";

const PINATA_API_KEY = "9efc0e04c44e53cb03cb";
const PINATA_SECRET_API_KEY = "6e7b9e07c8ccc760c977a53a34bbe6b3974b35e54137f6a6d7b1f6573f873130";

const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const data = new FormData();
  data.append("file", file);

  const res = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });
  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
};

const uploadMetadataToPinata = async (metadata) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const res = await axios.post(url, metadata, {
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });
  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
};

const MintNFT = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleMint = async (e) => {
    e.preventDefault();
    setStatus("Uploading to IPFS...");

    try {
      // 1. Upload image and metadata to IPFS
      const imageUrl = await uploadToPinata(file);
      const metadata = {
        name,
        description,
        image: imageUrl,
      };
      const metadataUrl = await uploadMetadataToPinata(metadata);

      setStatus("Minting NFT on blockchain...");

      // 2. Interact with contract
      if (!window.ethereum) throw new Error("MetaMask not detected");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.mintNFT(await signer.getAddress(), metadataUrl);
      await tx.wait();

      setStatus("NFT minted successfully!");
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleMint} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Mint Your NFT</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      /><br />
      <textarea
        placeholder="Description"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <input
        type="file"
        accept="image/*"
        required
        onChange={(e) => setFile(e.target.files[0])}
      /><br />
      <button type="submit">Mint NFT</button>
      <div>{status}</div>
    </form>
  );
};

export default MintNFT;
