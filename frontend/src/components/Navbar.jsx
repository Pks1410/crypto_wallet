import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure you create CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>My Crypto Wallet</h2>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/walletdashboard">Create Wallet</Link></li>
        <li><Link to="/walletManager">Import Wallet</Link></li>
        {/* <li><Link to="/NFTmarketplace">NFTMarketplace</Link></li> */}
        <Link to="/NFTmarketplace" className="nav-link">NFT Marketplace</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
