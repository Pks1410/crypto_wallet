import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CryptoTable from "./components/cryptotable";
import CryptoConverter from "./components/cryptoconvertor";
import WalletManager from "./components/walletManager";
import WalletDashboard from "./components/walletdashboard";
import Signup from "./components/signup";
import Login from "./components/login";
import "./App.css";
import CryptoScroller from "./components/bottomnav";
import ParticlesBackground from "./components/particles";
import NFTMarketplace from "./components/NFTmarketplace";
import NFTDetails from "./components/nftdetails";
import { Web3Provider } from './components/web3context';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Web3Provider>
    <Router>
      <div className="app-wrapper">
        <ParticlesBackground />
        <ScrollToTop />
        <div className="app-content">
          <Navbar />
          <div className="app-container">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <CryptoTable />
                    <CryptoConverter />
                    <CryptoScroller />
                  </>
                } 
              />
              <Route path="/walletManager" element={<WalletManager />} />
              <Route path="/walletdashboard" element={<WalletDashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/NFTmarketplace" element={<NFTMarketplace />} />
              <Route path="/nft-details/:id" element={<NFTDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </Web3Provider>
  );
};

export default App;