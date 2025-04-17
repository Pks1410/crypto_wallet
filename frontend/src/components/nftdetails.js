import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useWeb3 } from "./web3context";
import axios from "axios";
import "./NFTMarketplace.css";

const NFTDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const { account, connectWallet } = useWeb3();

  useEffect(() => {
    const fetchNFTDetails = async () => {
      try {
        // In a real app, fetch from API using the ID
        const mockNFT = {
          id: id,
          name: `NFT #${id}`,
          price: `${Math.random().toFixed(2)} ETH`,
          image: 'https://via.placeholder.com/600',
          owner: '0x123...456',
          description: `Detailed description for NFT #${id}`,
          creator: '0x789...012',
          createdAt: '2023-01-01',
          attributes: [
            { trait_type: 'Background', value: 'Blue' },
            { trait_type: 'Rarity', value: 'Rare' }
          ]
        };
        setNft(mockNFT);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFT details:", error);
        setLoading(false);
      }
    };

    fetchNFTDetails();
  }, [id]);

  const handleBuy = () => {
    // Implement buy functionality
    alert(`Buying NFT ${id}`);
  };

  if (loading) {
    return <div className="loading">Loading NFT details...</div>;
  }

  if (!nft) {
    return <div className="not-found">NFT not found</div>;
  }

  return (
    <div className="nft-details">
      <Link to="/NFTmarketplace" className="back-link">← Back to Marketplace</Link>
      
      <div className="nft-details-container">
        <div className="nft-image-container">
          <img src={nft.image} alt={nft.name} className="nft-detail-image" />
        </div>
        
        <div className="nft-info-container">
          <h1 className="nft-detail-name">{nft.name}</h1>
          <p className="nft-detail-creator">Created by: {nft.creator}</p>
          <p className="nft-detail-owner">Owned by: {nft.owner}</p>
          <p className="nft-detail-price">Price: {nft.price}</p>
          
          <div className="nft-description">
            <h3>Description</h3>
            <p>{nft.description}</p>
          </div>
          
          <div className="nft-attributes">
            <h3>Attributes</h3>
            <div className="attributes-grid">
              {nft.attributes.map((attr, index) => (
                <div key={index} className="attribute-card">
                  <div className="attribute-type">{attr.trait_type}</div>
                  <div className="attribute-value">{attr.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="nft-actions">
            {account ? (
              <button className="buy-button" onClick={handleBuy}>
                Buy Now
              </button>
            ) : (
              <button className="connect-wallet" onClick={connectWallet}>
                Connect Wallet to Purchase
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;