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
import { useWeb3 } from "../../context/web3context";
import { Contract } from "ethers";
import contractABI from "./MyNFT_ABI.json";
import "./nftmarketplace.css";
import MintNFT from "./MintNFT";

const NFTMarketplace = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const { account, connectWallet, provider, error } = useWeb3();

  const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";

  // Fetch all NFTs
  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      try {
        // Replace with your Alchemy API key
        const apiKey = "d6EwrbI8tr4FyGoub47Zj2-UZCBsyzJ_";
        // Example: fetch NFTs from a popular collection (e.g., Bored Ape Yacht Club)
        const contractAddress = "0xBC4CA0eda7647A8ab7c2061c2e118A18a936f13D";
        const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection?contractAddress=${contractAddress}&withMetadata=true`;

        const response = await fetch(url);
        const data = await response.json();

        // Transform Alchemy NFT data to your UI format
        const nfts = (data.nfts || []).map((nft, idx) => ({
          id: nft.id?.tokenId || idx,
          name: nft.title || nft.metadata?.name || "NFT",
          price: "N/A", // Alchemy API does not provide price
          image: nft.media?.[0]?.gateway || nft.metadata?.image || "",
          owner: nft.owner || "N/A",
          description: nft.description || nft.metadata?.description || "",
          category: "collectibles"
        }));

        setNfts(nfts);
      } catch (error) {
        console.error("Error fetching NFTs from Alchemy:", error);
      }
      setLoading(false);
    };

    fetchNFTs();
  }, []);

  // Update fetchMyNFTs to handle errors better
  useEffect(() => {
    const fetchMyNFTs = async () => {
      if (!account || !provider) return;

      try {
        setLoading(true);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
        
        const balance = await contract.balanceOf(account);
        
        const nfts = [];
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(account, i);
          const tokenURI = await contract.tokenURI(tokenId);
          
          try {
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            
            nfts.push({
              id: tokenId.toString(),
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
              tokenURI: tokenURI
            });
          } catch (error) {
            console.error(`Error fetching metadata for token ${tokenId}:`, error);
          }
        }
        
        setMyNFTs(nfts);
      } catch (error) {
        console.error("Error fetching user's NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyNFTs();
  }, [account, provider]);

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || nft.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleBuyNFT = async (nftId) => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.buyNFT(nftId);
      await tx.wait();
      alert("NFT purchased successfully!");
    } catch (error) {
      console.error("Error buying NFT:", error);
      alert("Error buying NFT. Please try again.");
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading NFTs...</div>
      </div>
    );
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
          {!account ? (
            <div className="connect-wallet-prompt">
              <p>Connect your wallet to browse NFTs</p>
              <button className="connect-wallet" onClick={handleConnectWallet}>
                Connect Wallet
              </button>
            </div>
          ) : (
            <>
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
                          <Link to={`/nft-details/${nft.id}`} className="details-button">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-nfts">No NFTs found matching your criteria.</p>
              )}
            </>
          )}
        </div>
      )}
      
      {activeTab === "my-collections" && (
        <div className="collections-section">
          {!account ? (
            <div className="connect-wallet-prompt">
              <p>Connect your wallet to view your NFTs</p>
              <button className="connect-wallet" onClick={handleConnectWallet}>
                Connect Wallet
              </button>
            </div>
          ) : loading ? (
            <div className="loading">Loading your NFTs...</div>
          ) : myNFTs.length > 0 ? (
            <div className="nft-grid">
              {myNFTs.map(nft => (
                <div key={nft.id} className="nft-card">
                  <img src={nft.image} alt={nft.name} className="nft-image" />
                  <div className="nft-info">
                    <h3 className="nft-name">{nft.name}</h3>
                    <p className="nft-description">{nft.description}</p>
                    <div className="nft-actions">
                      <button className="list-button">List for Sale</button>
                      <Link to={`/nft-details/${nft.id}`} className="details-button">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-nfts">You don't own any NFTs yet.</p>
          )}
        </div>
      )}
      
      {activeTab === "create" && (
        <div className="create-section">
          {!account ? (
            <div className="connect-wallet-prompt">
              <p>Connect your wallet to create NFTs</p>
              <button className="connect-wallet" onClick={handleConnectWallet}>
                Connect Wallet
              </button>
            </div>
          ) : (
            <MintNFT />
          )}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default NFTMarketplace;