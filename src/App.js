import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CryptoTable from "./components/cryptotable";
import CryptoConverter from "./components/cryptoconvertor";
import WalletManager from "./components/walletManager";
import WalletDashboard from "./components/walletdashboard";
import Signup from "./signup";
import Login from "./login";
import "./App.css";
import CryptoScroller from "./components/bottomnav";
import ParticlesBackground from "./components/particles";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
const App = () => {

  return (
    <Router>
      <div className="app-wrapper"> {/* New wrapper */}
        <ParticlesBackground />
        <ScrollToTop />
      {/* App Content */}
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
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
};

export default App;

