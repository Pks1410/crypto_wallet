import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Web3Provider } from "./context/web3context.js";
import Navbar from "./components/Navbar";
import Auth from "./features/auth/Auth";
// import Login from "./features/auth/login";
// import Signup from "./features/auth/signup";
import ImportWallet from "./features/wallet/importwallet.jsx";
import ConnectWallet from "./features/wallet/connectwallet.jsx";
import Profile from "./features/profile/profile.jsx";
import NFTMarketplace from "./features/nft/nftmarketplace.jsx";
import NFTDetails from "./features/nft/nftdetails.js";
import CryptoMarket from "./features/crypto/cryptomarket.jsx";
import CryptoConverter from "./features/crypto/cryptoconvertor.jsx";
import CryptoTable from "./features/crypto/cryptotable.jsx";
import CryptoScroller from "./components/bottomnav.jsx";
import ParticlesBackground from "./components/common/particles.js";
import ProtectedRoute from "./components/ProtectedRoute";
import PortfolioChart from "./features/portfolio/PortfolioChart.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "./context/ThemeContext";
import NewsFeed from "./features/news/NewsFeed.jsx";
import MintNFT from "./features/nft/MintNFT.jsx";

const ScrollToTop = () => {
  // eslint-disable-next-line no-undef
  const { pathname } = useLocation();

  // eslint-disable-next-line no-undef
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const LandingPage = () => (
  <>
    <CryptoTable />
    <CryptoConverter />
    <CryptoMarket />
    <CryptoScroller />
    <NewsFeed />
    {/* <MintNFT /> */}
    {/* <PortfolioChart /> */}
  </>
);

const clientId = "YOUR_GOOGLE_CLIENT_ID";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Web3Provider>
          <GoogleOAuthProvider clientId={clientId}>
            <Router>
              <div className="app-wrapper">
                <ParticlesBackground />
                <ScrollToTop /> 
                <div className="app-content">
                  <Navbar />
                  <div className="app-container">
                    <Routes>
                      {/* Show Auth page at root if not authenticated */}
                      <Route path="/" element={<AuthRedirect />} />
                      <Route
                        path="/home"
                        element={
                          <ProtectedRoute>
                            <LandingPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/import-wallet" element={<ImportWallet />} />
                      <Route path="/connect-wallet" element={<ConnectWallet />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/create-nft" element={<NFTMarketplace />} />
                      <Route path="/nft-details" element={<NFTDetails />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </Router>
          </GoogleOAuthProvider>
        </Web3Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Helper component to redirect based on auth state
const AuthRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Auth />;
};
export default App;
