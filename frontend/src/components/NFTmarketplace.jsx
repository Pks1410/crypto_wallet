// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./NFTMarketplace.css"; // Optional styling file

// const NFTMarketplace = () => {
//   const [activeTab, setActiveTab] = useState("browse");
//   const [nfts, setNfts] = useState([
//     {
//       id: 1,
//       name: 'CryptoPunk #1234',
//       price: '2.5 ETH',
//       image: 'https://via.placeholder.com/300',
//       owner: '0x123...456',
//       description: 'Rare CryptoPunk from the original collection'
//     },
//     {
//       id: 2,
//       name: 'Bored Ape #5678',
//       price: '3.2 ETH',
//       image: 'https://via.placeholder.com/300',
//       owner: '0x789...012',
//       description: 'Exclusive Bored Ape Yacht Club member'
//     },
//     {
//       id: 3,
//       name: 'Art Block #9012',
//       price: '1.8 ETH',
//       image: 'https://via.placeholder.com/300',
//       owner: '0x345...678',
//       description: 'Generative art piece from Art Blocks'
//     },
//   ]);

//   return (
//     <div className="nft-marketplace">
//       <h1 className="marketplace-title">NFT Marketplace</h1>
      
//       <div className="marketplace-tabs">
//         <button 
//           className={activeTab === "browse" ? "active" : ""}
//           onClick={() => setActiveTab("browse")}
//         >
//           Browse NFTs
//         </button>
//         <button 
//           className={activeTab === "my-collections" ? "active" : ""}
//           onClick={() => setActiveTab("my-collections")}
//         >
//           My Collections
//         </button>
//         <button 
//           className={activeTab === "create" ? "active" : ""}
//           onClick={() => setActiveTab("create")}
//         >
//           Create NFT
//         </button>
//       </div>
      
//       {activeTab === "browse" && (
//         <div className="browse-section">
//           <div className="search-filter">
//             <input 
//               type="text" 
//               placeholder="Search by name, collection, or artist..." 
//               className="search-input"
//             />
//             <select className="category-select">
//               <option value="all">All Categories</option>
//               <option value="art">Art</option>
//               <option value="collectibles">Collectibles</option>
//               <option value="music">Music</option>
//               <option value="photography">Photography</option>
//             </select>
//           </div>
          
//           <div className="nft-grid">
//             {nfts.map(nft => (
//               <div key={nft.id} className="nft-card">
//                 <img src={nft.image} alt={nft.name} className="nft-image" />
//                 <div className="nft-info">
//                   <h3 className="nft-name">{nft.name}</h3>
//                   <p className="nft-price">Price: {nft.price}</p>
//                   <p className="nft-owner">Owner: {nft.owner}</p>
//                   <div className="nft-actions">
//                     <button className="buy-button">Buy Now</button>
//                     <button className="details-button">View Details</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
      
//       {activeTab === "my-collections" && (
//         <div className="collections-section">
//           <p>Your collected NFTs will appear here once you connect your wallet.</p>
//           <button className="connect-wallet">Connect Wallet</button>
//         </div>
//       )}
      
//       {activeTab === "create" && (
//         <div className="create-section">
//           <h2>Create New NFT</h2>
//           <form className="create-form">
//             <div className="form-group">
//               <label>NFT Name</label>
//               <input type="text" placeholder="Enter NFT name" />
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <textarea placeholder="Describe your NFT"></textarea>
//             </div>
//             <div className="form-group">
//               <label>Upload Image</label>
//               <input type="file" accept="image/*" />
//             </div>
//             <div className="form-group">
//               <label>Price (ETH)</label>
//               <input type="number" placeholder="0.00" step="0.01" />
//             </div>
//             <button type="submit" className="create-button">Mint NFT</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NFTMarketplace;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from "./web3context"; // Assuming you have a Web3 context
import axios from "axios"; // For API calls
import "./NFTMarketplace.css";

const NFTMarketplace = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const { account, connectWallet } = useWeb3(); // From your wallet context

  // Fetch NFTs from an API (mock data for now)
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // In a real app, you would fetch from an API like OpenSea or your backend
        const mockData = [
          {
            id: 1,
            name: 'CryptoPunk #1234',
            price: '2.5 ETH',
            image: 'https://via.placeholder.com/300',
            owner: '0x123...456',
            description: 'Rare CryptoPunk from the original collection',
            category: 'collectibles'
          },
          // ... more mock data
        ];
        
        setNfts(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || nft.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleBuyNFT = (nftId) => {
    // In a real app, this would interact with a smart contract
    alert(`Buying NFT with ID: ${nftId}`);
    // Example: contract.methods.buyNFT(nftId).send({ from: account });
  };

  const handleCreateNFT = async (e) => {
    e.preventDefault();
    // In a real app, this would mint a new NFT
    alert("NFT creation would be handled here");
    // Example: contract.methods.mintNFT(metadataURI).send({ from: account });
  };

  if (loading) {
    return <div className="loading">Loading NFTs...</div>;
  }

  return (
    <div className="nft-marketplace">
      <h1 className="marketplace-title">NFT Marketplace</h1>
      
      <div className="marketplace-tabs">
        <button 
          className={activeTab === "browse" ? "active" : ""}
          onClick={() => setActiveTab("browse")}
        >
          Browse NFTs
        </button>
        <button 
          className={activeTab === "my-collections" ? "active" : ""}
          onClick={() => setActiveTab("my-collections")}
        >
          My Collections
        </button>
        <button 
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          Create NFT
        </button>
      </div>
      
      {activeTab === "browse" && (
        <div className="browse-section">
          <div className="search-filter">
            <input 
              type="text" 
              placeholder="Search by name, collection, or artist..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="art">Art</option>
              <option value="collectibles">Collectibles</option>
              <option value="music">Music</option>
              <option value="photography">Photography</option>
            </select>
          </div>
          
          {filteredNFTs.length > 0 ? (
            <div className="nft-grid">
              {filteredNFTs.map(nft => (
                <div key={nft.id} className="nft-card">
                  <img src={nft.image} alt={nft.name} className="nft-image" />
                  <div className="nft-info">
                    <h3 className="nft-name">{nft.name}</h3>
                    <p className="nft-price">Price: {nft.price}</p>
                    <p className="nft-owner">Owner: {nft.owner}</p>
                    <div className="nft-actions">
                      <button 
                        className="buy-button"
                        onClick={() => handleBuyNFT(nft.id)}
                      >
                        Buy Now
                      </button>
                      <Link 
                        to={`/nft-details/${nft.id}`} 
                        className="details-button"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">No NFTs found matching your criteria</div>
          )}
        </div>
      )}
      
      {activeTab === "my-collections" && (
        <div className="collections-section">
          {account ? (
            <div className="user-collections">
              <h2>Your NFT Collection</h2>
              {/* Display user's NFTs here */}
            </div>
          ) : (
            <div className="connect-wallet-prompt">
              <p>Connect your wallet to view your collections</p>
              <button 
                className="connect-wallet"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === "create" && (
        <div className="create-section">
          <h2>Create New NFT</h2>
          <form className="create-form" onSubmit={handleCreateNFT}>
            <div className="form-group">
              <label>NFT Name</label>
              <input 
                type="text" 
                placeholder="Enter NFT name" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Describe your NFT"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Upload Image</label>
              <input 
                type="file" 
                accept="image/*" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Price (ETH)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                step="0.01" 
                min="0"
                required 
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select required>
                <option value="">Select a category</option>
                <option value="art">Art</option>
                <option value="collectibles">Collectibles</option>
                <option value="music">Music</option>
                <option value="photography">Photography</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="create-button"
              disabled={!account}
            >
              {account ? "Mint NFT" : "Connect Wallet to Mint"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NFTMarketplace;